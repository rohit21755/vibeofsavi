'use client'
import React, { useRef } from 'react'
import Link from 'next/link'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
const Login = () => {
    const router = useRouter()
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const { data: session } = useSession()
    const [loading , setLoading] = React.useState(false)
    React.useEffect(() => {
        if (session) {
            setLoading(true)
            router.push('/')
           
        }
    }, [session])
    function handleSubmit(e:any) {
        e.preventDefault()
    
        signIn('credentials', {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
        })
    }
    return (
        <>
          
            <div id="header" className='relative w-full'>
                <MenuOne  />
                <Breadcrumb heading='Login' subHeading='Login' />
            </div>
            <div className="login-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Login</div>
                            <form className="md:mt-7 mt-4" onSubmit={handleSubmit}>
                                <div className="email ">
                                    <input ref={emailRef} className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="username" type="email" placeholder="Email address *" required />
                                </div>
                                <div className="pass mt-5">
                                    <input ref={passwordRef} className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="password" type="password" placeholder="Password" required />
                                </div>
                                <div className="flex items-center justify-between mt-5">
                                    
                                    <Link href={'/forgot-password'} className='font-semibold hover:underline'>Forgot Your Password?</Link>
                                </div>
                                <div className="block-button md:mt-7 mt-4">
                                    <button className="button-main" type='submit'>Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">New Customer</div>
                                <div className="mt-2 text-secondary">Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.</div>
                                <div className="block-button md:mt-7 mt-4">
                                    <Link href={'/register'} className="button-main">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login