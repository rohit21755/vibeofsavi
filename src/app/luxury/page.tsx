'use client'

import React, { useState, useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import ShopFilterDropdown from '@/components/Shop/ShopFilterDropdown'
import { GlobalContextData } from '@/context/GlobalContext'
import Footer from '@/components/Footer/Footer'

export default function FilterDropdown() {
    const searchParams = useSearchParams()
    const type = searchParams.get('type')
    const category = searchParams.get('category')
    const { Products } = useContext(GlobalContextData)
    return (
        <>
           
            <div id="header" className='relative w-full'>
                <MenuOne  />
            </div>
            <div className="shop-square">
                <ShopFilterDropdown data={Products.filter(product => product.luxury === true)} productPerPage={12} dataType={type} />
            </div>
            <Footer />
        </>
    )
}
