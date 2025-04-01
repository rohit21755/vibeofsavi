import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductType } from '@/type/ProductType'
import Product from '../Product/Product';

interface Props {
    data: Array<ProductType>;
}

const ShopCollection: React.FC<Props> = ({ data }) => {
    return (
        <>
            <div className="shop-collection lg:py-20 md:py-14 py-10">
                <div className="container">
                    <div className="banner-heading rounded-2xl overflow-hidden relative max-lg:h-[300px] max-md:h-[260px]">
                        <div className="bg-img h-full">
                            <Image
                                src={'/images/banner/banner-shop-breadcrumb-img.png'}
                                width={3000}
                                height={3000}
                                alt='bg'
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className="text-content absolute top-1/2 -translate-y-1/2 right-10">
                            <div className="body1 font-semibold uppercase">New Trend 2022</div>
                            <div className="heading1 font-semibold mt-2">Sale Off <br />Up To 30%</div>
                            {/* <Link  className='button-main lg:mt-10 mt-6'>Explore More</Link> */}
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </>
    )
}

export default ShopCollection