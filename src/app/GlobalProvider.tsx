"use client"
import React from 'react'
import { CartProvider } from '@/context/CartContext'
import { ModalCartProvider } from '@/context/ModalCartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ModalWishlistProvider } from '@/context/ModalWishlistContext'
import { CompareProvider } from '@/context/CompareContext'
import { ModalCompareProvider } from '@/context/ModalCompareContext'
import { ModalSearchProvider } from '@/context/ModalSearchContext'

import { SessionProvider } from 'next-auth/react'
import { GlobalContextProvider } from '@/context/GlobalContext'
import Head from 'next/head'
const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    return (
        <>
        <SessionProvider>
        <GlobalContextProvider>
        
        <CartProvider>
            <ModalCartProvider>
                <WishlistProvider>
                    <ModalWishlistProvider>
                        <CompareProvider>
                            <ModalCompareProvider>
                                <ModalSearchProvider>
                                 
                                        {children}
                                 
                                </ModalSearchProvider>
                            </ModalCompareProvider>
                        </CompareProvider>
                    </ModalWishlistProvider>
                </WishlistProvider>
            </ModalCartProvider>
        </CartProvider>
        
        </GlobalContextProvider>
        </SessionProvider>
        </>
    )
}

export default GlobalProvider