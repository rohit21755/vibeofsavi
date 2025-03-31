'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { fetchCart, addToCart as apiAddToCart, removeFromCartMain } from '@/services/apiServies';

interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    selectedSize?: string;
}

interface CartState {
    cartArray: CartItem[];
}

type CartAction =
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextProps {
    cartState: CartState;
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.cartArray.find(item => 
                item.productId === action.payload.productId && 
                item.selectedSize === action.payload.selectedSize );
           
            
            if (existingItem) {
                return {
                    ...state,
                    cartArray: state.cartArray.map(item => 
                        item.productId === action.payload.productId && 
                        item.selectedSize === action.payload.selectedSize
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                };
            }
            return { ...state, cartArray: [...state.cartArray, action.payload] };
        }
        case 'REMOVE_FROM_CART':
            return { ...state, cartArray: state.cartArray.filter(item => item.productId !== Number(action.payload)) };
        case 'LOAD_CART':
            return { ...state, cartArray: action.payload };
        default:
            return state;
    }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, { cartArray: [] });
    const { data: session } = useSession();
   
    useEffect(() => {
        if (session?.accessToken) {
            //@ts-ignore
            fetchCart(session.accessToken).then((cart: CartItem[]) => {
                console.log(cart);
                dispatch({ type: 'LOAD_CART', payload: cart });
            });
        }
    }, [session]);

    const addToCart = async (item: CartItem) => {
        if (!session?.accessToken) return;
        const response = await apiAddToCart(session.accessToken, String(item.productId), item.quantity, item.selectedSize || '');
        if (response) {
            dispatch({ type: 'ADD_TO_CART', payload: item });
            alert('Product added to cart');
        }
        
    };

    const removeFromCart = async (productId: number) => {
       

        if(session?.user) {
        console.log(productId);
        const response = await removeFromCartMain(session?.accessToken, productId);
        if (response) {
            dispatch({ type: 'REMOVE_FROM_CART', payload: String(productId) });
            alert('Product removed from cart');
        }
        
    }
    else {
        alert('Some error occured');
    }
        
    };

    return (
        <CartContext.Provider value={{ cartState, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
