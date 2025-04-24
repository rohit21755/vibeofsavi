'use client'

import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb1';
import Footer from '@/components/Footer/Footer';
import { GlobalContextData } from '@/context/GlobalContext';

export default function BreadCrumb1({ params }: { params: { breadcrumb1: string } }) {
    const searchParams = useSearchParams();
    const { Products, colors } = useContext(GlobalContextData);

    const [type, setType] = useState<string | null | undefined>();
    const datatype = searchParams.get('type');
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    // Extract gender from params
    const newGender = String(params.breadcrumb1).toLowerCase(); 

    useEffect(() => {
        setType(datatype);
    }, [datatype]);
    console.log(Products)
    // Ensure Products exist and filter correctly
    const filteredProducts = Products?.filter(product => 
       
        (!newGender || product.gender?.toLowerCase() === newGender) 
      
    ) || [];
    console.log(filteredProducts)
    return (
        <>
            <ShopBreadCrumb1 
                data={filteredProducts.filter(product => product.luxury === false)}
                productPerPage={30} 
                dataType={type} 
                colors = {colors}
                category={category} 
            />
            <Footer />
        </>
    );
}
