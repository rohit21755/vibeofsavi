import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { APIS } from "../../../../apiconfig";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            name: string;
            email: string;
            phoneNumber: string;
            address: {
                id: number;
                address: string;
                city: string;
                state: string;
                zip: number;
                userId: number;
            };
        } & DefaultSession["user"];
        accessToken: string;
    }

    interface User extends DefaultUser {
        id: number;
        phoneNumber: string;
        accessToken: string;
        address: {
            id: number;
            address: string;
            city: string;
            state: string;
            zip: number;
            userId: number;
        };
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
                };
                try {
                    const response = await axios.post(APIS.login, data);
                    
                    if (response.data.token) {
                        const user = {
                            id: response.data.user.id,
                            name: response.data.user.name,
                            email: response.data.user.email,
                            phoneNumber: response.data.user.phoneNumber,
                            accessToken: response.data.token,
                            address: response.data.user.address,
                        };
                     
                        return user;
                    }
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                if (session && session.address) {
                    token.address = session.address;
                }
            }
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.phoneNumber = user.phoneNumber;
                token.accessToken = user.accessToken;
                token.address = user.address;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as number;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.phoneNumber = token.phoneNumber as string;
                session.user.address = token.address as {
                    id: number;
                    address: string;
                    city: string;
                    state: string;
                    zip: number;
                    userId: number;
                };
                session.accessToken = token.accessToken as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/",
        error: "/login",
    },
});

export const GET = handler;
export const POST = handler;
