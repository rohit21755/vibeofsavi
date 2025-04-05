'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import { GlobalContextData } from '@/context/GlobalContext'

const LoadingScreen = () => {
    const { status } = useSession()
    const { loading: productsLoading } = useContext(GlobalContextData)

    // Show loading screen while session is loading or products are loading
    if (status === 'loading' || productsLoading) {
        return (
            <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-lg font-medium">Loading...</p>
                </div>
            </div>
        )
    }

    return null
}

export default LoadingScreen 