import NextAuth, {DefaultSession, DefaultUser} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { APIS } from "../../../../../apiconfig";
declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            name: string;
            email: string;
            phoneNumber: string;
        } & DefaultSession["user"];
        accessToken: string;
    }

    interface User extends DefaultUser {
        id: number;
        phoneNumber: string;
        accessToken: string;
    }
}
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<any> {
                if (!credentials) {
                    return null;
                }
                const data = {
                    email: credentials.email,
                    password: credentials.password,
                }
                try {
                    const response = await axios.post(APIS.login, data);
                    if (response.data.token) {
                        const user = {
                            id: response.data.user.id,
                            name: response.data.user.name,
                            email: response.data.user.email,
                            phoneNumber: response.data.user.phoneNumber,
                            accessToken: response.data.token,
                        }
                        console.log(user);
                        return  user
                    }
                }
                catch (error) {
                    console.log(error);
                    return null
                }

            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    } ,
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.phoneNumber = user.phoneNumber;
                token.accessToken = user.accessToken;
            }
            return token
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id as number;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.phoneNumber = token.phoneNumber as string;
                session.accessToken = token.accessToken as string;
            }
            return session;
        },
        
    },
    pages: {
        signIn: "/login",
        
    }
});

export const GET = handler;
export const POST = handler;