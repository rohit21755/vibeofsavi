'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ProductData } from '@/type/NewProduct';
import { GlobalContextData } from './GlobalContext';
import { fetchWishlist, addWishlist, removeWishlist, formatedata } from '@/services/apiServies';

interface WishlistItem extends ProductData {}

interface WishlistState {
    wishlistArray: WishlistItem[];
}

type WishlistAction =
    | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
    | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
    | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] };

interface WishlistContextProps {
    wishlistState: WishlistState;
    addToWishlist: (item: ProductData) => void;
    removeFromWishlist: (itemId: string) => void;
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
                wishlistArray: state.wishlistArray.filter((item) => item.id !== action.payload),
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

    useEffect(() => {
        const loadWishlist = async () => {
            if (session?.user) {
                try {
                    const wishlistData = await fetchWishlist(session.accessToken);
                    console.log(wishlistData);
                    console.log(Products);
                    const data  = wishlistData.wishlist.map( item => {
                        console.log(item)
                        let product = Products.Products.find(product => Number(product.id) === Number(item.productId));
                        return product;
                    })
                    console.log(data);
                    dispatch({ type: 'LOAD_WISHLIST', payload: data });
                } catch (error) {
                    console.error('Failed to load wishlist:', error);
                }
            }
        };
        loadWishlist();
    }, [session]);
    

    const addToWishlist = async (item: ProductData) => {
        try {
            const response = await addWishlist(session?.accessToken as string, item.id);
            if (response?.status === 200) {
                dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
            } else {
                alert("Failed to add to wishlist");
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };
    

    const removeFromWishlist = async (itemId: string) => {
        try {
            console.log(itemId);
            // const response = await removeWishlist(session?.accessToken as string, itemId);
            // if (response?.status === 200) {
            //     dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: itemId });
            // } else {
            //     alert("Failed to remove from wishlist");
            // }
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
