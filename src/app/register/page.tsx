'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { LoaderCircle } from 'lucide-react'
import { registerUser } from '@/services/apiServies'
import { useRouter } from 'next/navigation';
const Register = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async(e: { preventDefault: () => void }) => {
        e.preventDefault();
        const router = useRouter();
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const phone = phoneRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;
        


        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log(password)
        if (!name || !email || !phone || !password) {
            alert('Please fill all the fields');
            return;
        }

        const data = {
            name: name,
            email: email,
            phoneNumber: phone,
            password: password,
        };
        const res = await registerUser(data, setLoading);
        if(res){
            alert('Registration successful!');
            router.push('/login');
        }
       
    };

    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuOne  />
                <Breadcrumb heading='Create An Account' subHeading='Create An Account' />
            </div>
            <div className="register-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Register</div>
                            <form className="md:mt-7 mt-4" onSubmit={handleSubmit}>
                            <div className="Name mt-5">
                                    <input ref={nameRef} className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="name" type="Text" placeholder="Name" required />
                                </div>
                                <div className="email mt-5">
                                    <input ref={emailRef} className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="email" type="text" placeholder="Email" required />
                                </div>
                                <div className="Phone Number mt-5">
                                    <input ref={phoneRef} className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="phone" type="tel" placeholder="Phone Number" required />
                                </div>
                                <div className="pass mt-5">
                                    <input ref={passwordRef} className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="password1" type="password" placeholder="Password *" required />
                                </div>
                                <div className="confirm-pass mt-5">
                                    <input ref={confirmPasswordRef} className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="confirmPassword" type="password" placeholder="Confirm Password *" required />
                                </div>
                               
                                <div className="block-button md:mt-7 mt-4">
                                    <button className="button-main" type="submit">{loading? <LoaderCircle style={{
                                        marginInline: 'auto',
                                        animation: 'spin 1s linear infinite'
                                    }}/> : "Register"}</button>
                                </div>
                            </form>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">Already have an account?</div>
                                <div className="mt-2 text-secondary">Welcome back. Sign in to access your personalized experience, saved preferences, and more. We{String.raw`'re`} thrilled to have you with us again!</div>
                                <div className="block-button md:mt-7 mt-4">
                                    <Link href={'/login'} className="button-main">Login</Link>
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

export default Register