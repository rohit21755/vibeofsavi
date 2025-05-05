'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { fetchWishlist, addWishlist, removeWishlist } from '@/services/apiServies';
import { GlobalContextData } from './GlobalContext';

interface WishlistState {
    wishlistArray: number[]; // Store only product IDs
}

type WishlistAction =
    | { type: 'ADD_TO_WISHLIST'; payload: number }
    | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
    | { type: 'LOAD_WISHLIST'; payload: number[] };

interface WishlistContextProps {
    wishlistState: WishlistState;
    addToWishlist: (itemId: number) => void;
    removeFromWishlist: (itemId: number) => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

const WishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            return {
                ...state,
                wishlistArray: [...state.wishlistArray, action.payload],
            };
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlistArray: state.wishlistArray.filter((id) => id !== action.payload),
            };
        case 'LOAD_WISHLIST':
            return {
                ...state,
                wishlistArray: action.payload,
            };
        default:
            return state;
    }
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session } = useSession();
    const [wishlistState, dispatch] = useReducer(WishlistReducer, { wishlistArray: [] });
    const Products = useContext(GlobalContextData);
    const loadWishlist2 = async () => {
        if (session?.user) {
            try {
                const wishlistData = await fetchWishlist(session.accessToken);
                console.log(wishlistData);

                // Extract only product IDs
                const productIds = wishlistData.wishlist.map((item: any) => Number(item.productId));

                dispatch({ type: 'LOAD_WISHLIST', payload: productIds });
            } catch (error) {
                console.error('Failed to load wishlist:', error);
            }
        }
    };

    useEffect(() => {
        const loadWishlist = async () => {
            if (session?.user) {
                try {
                    const wishlistData = await fetchWishlist(session.accessToken);
                    console.log(wishlistData);

                    // Extract only product IDs
                    const productIds = wishlistData.wishlist.map((item: any) => Number(item.productId));

                    dispatch({ type: 'LOAD_WISHLIST', payload: productIds });
                } catch (error) {
                    console.error('Failed to load wishlist:', error);
                }
            }
        };
        loadWishlist();
    }, [session]);

    const addToWishlist = async (itemId: number) => {
       
        try {
           
            const response = await addWishlist(session?.accessToken as string, String(itemId));
            if (response?.status === 201) {
                dispatch({ type: 'ADD_TO_WISHLIST', payload: itemId });
                await loadWishlist2()
            } else if (response?.status===402){
                alert("Product is already added to Wishlist")
            }
             else {
                alert("Failed to add to wishlist");
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            alert("Failed to add to wishlist");
        }
        
    };

    const removeFromWishlist = async (itemId: number) => {
        try {
            const response = await removeWishlist(session?.accessToken as string, String(itemId));
            if (response?.status === 200) {
                dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: itemId });
                await loadWishlist2()
            } else {
                alert("Failed to remove from wishlist");
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlistState, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
