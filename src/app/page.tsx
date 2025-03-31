"use client";
import React from 'react'
import SliderOne from '@/components/Slider/SliderOne'
import WhatNewOne from '@/components/Home1/WhatNewOne'

import Collection from '@/components/Home1/Collection'
import TabFeatures from '@/components/Home1/TabFeatures'
import Banner from '@/components/Home1/Banner'
import Benefit from '@/components/Home1/Benefit'
import testimonialData from '@/data/Testimonial.json'
import Testimonial from '@/components/Home1/Testimonial'
import Instagram from '@/components/Home1/Instagram'
import Brand from '@/components/Home1/Brand'
import Footer from '@/components/Footer/Footer'
import FAQAccordion from '@/components/Home1/Faq'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import { GlobalContextData } from '@/context/GlobalContext'
export default function Home() {
  const { data: session, status } = useSession()

  
  const { Products } = useContext(GlobalContextData);
  return (
    <>
      
      <div id="header" className='relative w-full'>
        
        <SliderOne />
      </div>
      <WhatNewOne data={Products} start={0} limit={4} />
      {/* <Collection /> */}
      <TabFeatures data={Products} start={0} limit={6} />
      {/* <Banner /> */}
      <Benefit props="md:py-20 py-10" />
      <Testimonial data={testimonialData} limit={6} />
      {/* <Instagram /> */}
      {/* <Brand /> */}

      <Footer />
      {/* <ModalNewsletter /> */}
    </>
  )
}
