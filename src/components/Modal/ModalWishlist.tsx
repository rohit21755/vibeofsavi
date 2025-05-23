'use client';

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useModalWishlistContext } from '@/context/ModalWishlistContext';
import { useWishlist } from '@/context/WishlistContext';
import { GlobalContextData } from '@/context/GlobalContext';
import { useSession } from 'next-auth/react';

const ModalWishlist = () => {
    const { isModalOpen, closeModalWishlist } = useModalWishlistContext();
    const { wishlistState, removeFromWishlist } = useWishlist();
    const { Products } = useContext(GlobalContextData);
    const { data: session } = useSession();
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        if (Products.length > 0 && wishlistState.wishlistArray.length > 0) {
            const filteredProducts = wishlistState.wishlistArray
                .map(id => Products.find(product => Number(product.id) === id))
                .filter(Boolean);
            setProducts(filteredProducts);
        }
    }, [wishlistState.wishlistArray, Products]);

    return (
        <div className={`modal-wishlist-block`} onClick={closeModalWishlist}>
            <div
                className={`modal-wishlist-main py-6 ${isModalOpen ? 'open' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="heading px-6 pb-3 flex items-center justify-between relative">
                    <div className="heading5">Wishlist</div>
                    <div
                        className="close-btn absolute right-6 top-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                        onClick={closeModalWishlist}
                    >
                        <Icon.X size={14} />
                    </div>
                </div>
                
                {session ? (
                    products.length === 0 ? (
                        <div className="text-gray-500 text-center text-sm">No items in wishlist</div>
                    ) : (
                        <div className="list-product px-6">
                            {products.map((product: any) => (
                                <div key={product?.id} className='item py-5 flex items-center justify-between gap-3 border-b border-line'>
                                    <div className="infor flex items-center gap-5">
                                        <div className="bg-img">
                                            <Image
                                                src={product?.thumbImage[0]}
                                                width={100}
                                                height={100}
                                                alt={product?.name}
                                                className='w-[100px] aspect-square flex-shrink-0 rounded-lg'
                                            />
                                        </div>
                                        <div>
                                            <div className="name text-button">{product?.name}</div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="product-price text-title">₹{product?.price}.00</div>
                                                <div className="product-origin-price text-title text-secondary2">
                                                    <del>₹{product?.originPrice}.00</del>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="remove-wishlist-btn caption1 font-semibold text-red underline cursor-pointer"
                                        onClick={() => {removeFromWishlist(product?.id)
                                            closeModalWishlist()  
                                        }
                                        }
                                    >
                                        Remove
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="text-gray-500 text-center text-sm">Please login to view wishlist</div>
                )}

              
            </div>
        </div>
    );
};

export default ModalWishlist;