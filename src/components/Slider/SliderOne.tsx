'use client'

import React, { Component } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/effect-fade';
import bg1 from "../../../public/images/home/bg1.png"
import bg2 from "../../../public/images/home/bg2.png"
import bg3 from "../../../public/images/home/bg3.png"
const SliderOne = () => {
    let src= "https://anvogue.vercel.app/_next/image?url=%2Fimages%2Fslider%2Fbg1-2.png&w=750&q=75"
    return (
        <>
            <div className="slider-block style-one bg-linear xl:h-[860px] lg:h-[800px] md:h-[580px] sm:h-[500px] h-[350px] max-[420px]:h-[320px] w-full">
                <div className="slider-main h-full w-full">
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        pagination={{ clickable: true }}
                        modules={[Pagination, Autoplay]}
                        className='h-full relative'
                        autoplay={{
                            delay: 4000,
                        }}
                    >
                        <SwiperSlide>
                            <div className="slider-item h-full w-full relative">
                                <div className="container w-full h-full flex items-center relative">
                                    <div className="text-content basis-1/2">
                                        <div className="text-sub-display">Sale! Up To 50% Off!</div>
                                        <div className="text-display md:mt-5 mt-2">Summer Sale Collections</div>
                                    </div>
                                    <div className="sub-img absolute sm:w-1/2 w-3/5 2xl:-right-[60px] -right-[16px] bottom-0">
                                        <Image
                                            src={bg1}
                                            width={600}
                                            height={736}
                                            alt='bg1-1'
                                            priority={true}
                                            className='bg-transparent'
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="slider-item h-full w-full relative">
                                <div className="container w-full h-full flex items-center relative">
                                    <div className="text-content basis-1/2">
                                        <div className="text-sub-display">Sale! Up To 50% Off!</div>
                                        <div className="text-display md:mt-5 mt-2">Fashion for Every Occasion</div>
                                    </div>
                                    <div className="sub-img absolute w-1/2 2xl:-right-[60px] -right-[0] sm:-bottom-[60px] bottom-0">
                                        <Image
                                            src={bg2}
                                            width={600}
                                            height={736}
                                            alt='bg1-2'
                                            priority={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="slider-item h-full w-full relative">
                                <div className="container w-full h-full flex items-center relative">
                                    <div className="text-content basis-1/2">
                                        <div className="text-sub-display">Sale! Up To 50% Off!</div>
                                        <div className="text-display md:mt-5 mt-2">Stylish Looks for Any Season</div>
                                    </div>
                                    <div className="sub-img absolute sm:w-1/2 w-2/3 2xl:-right-[60px] -right-[36px] sm:bottom-0 -bottom-[30px]">
                                        <Image
                                            src={bg3}
                                            width={600}
                                            height={736}
                                            alt='bg1-3'
                                            priority={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default SliderOne
