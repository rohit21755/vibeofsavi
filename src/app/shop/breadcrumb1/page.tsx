'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb1'
import Footer from '@/components/Footer/Footer'
import { useContext } from 'react'
import { GlobalContextData } from '@/context/GlobalContext'
export default function BreadCrumb1() {
    const searchParams = useSearchParams()
    const { Products } = useContext(GlobalContextData);
    let [type,setType] = useState<string | null | undefined>()
    let datatype = searchParams.get('type')
    let gender = searchParams.get('gender')
    let category = searchParams.get('category')

    useEffect(() => {
        setType(datatype);
    }, [datatype]);
    

    return (
        <>
            
            <ShopBreadCrumb1 data={Products} productPerPage={9} dataType={type} gender={gender} category={category} />
            <Footer />      
        </>
    )
}
