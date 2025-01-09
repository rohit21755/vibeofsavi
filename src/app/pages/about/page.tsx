'use client'
import React from 'react'
import Image from 'next/image';
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Benefit from '@/components/Home1/Benefit'
// import Newsletter from '@/components/Home4/Newsletter'
// import Instagram from '@/components/Home6/Instagram'
import Brand from '@/components/Home1/Brand'
import Footer from '@/components/Footer/Footer'
import BackgroundVideo from 'next-video/background-video';
import v2 from '../../../../videos/v2.mp4'
const AboutUs = () => {
    return (
        <>
      
            <div id="header" className='relative w-full'>

                <Breadcrumb heading='About Us' subHeading='About Us' />
            </div>
            <div className='about md:pt-20 pt-10'>
                <div className="about-us-block">
                    <div className="container">
                        <div className="text flex items-center justify-center">
                            <div className="content md:w-5/6 w-full">
                              
                                <div className="body1 text-center md:mt-7 mt-5">Vibe of Savi come with a new inspirational  ideas in the World fashion industry. Founded by Mr. Vinay and Mrs. Rajbala in 2024, to share the creative vision in casual and couture fashion with the fashion world with a vision to reach the maximum. We aim at celebrating individuality, social and cultural inclusivity providing the best and excusive clothing.</div>
                            </div>
                        </div>
                        <div className="list-img grid sm:grid-cols-3 gap-[30px] md:pt-20 pt-10">
                            <div className="bg-img">
                                

                                <BackgroundVideo
                                className='w-full rounded-[30px]'
                                        src={v2}
                                        />
                            </div>
                            <div className="bg-img">
                            <BackgroundVideo
                                className='w-full rounded-[30px]'
                                        src={v2}
                                        />
                            </div>
                            <div className="bg-img">
                            <BackgroundVideo
                                className='w-full rounded-[30px]'
                                        src={v2}
                                        />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Benefit props="md:pt-20 pt-10" />
            {/* <Newsletter props="bg-green md:mt-20 mt-10" />
            <Instagram /> */}
            <Brand />
            <Footer />
        </>
    )
}

export default AboutUs