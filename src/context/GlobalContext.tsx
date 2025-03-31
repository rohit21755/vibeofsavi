"use client";
import React, { useEffect, useState, createContext, ReactNode, useRef } from "react";
import { ProductData } from "@/type/NewProduct";
import { fetchProducts } from "@/services/apiServies";

interface GlobalContextType {
    Products: ProductData[];
}

export const GlobalContextData = createContext<GlobalContextType>({ Products: [] });

interface GlobalContextProviderProps {
    children: ReactNode;
}

export function GlobalContextProvider({ children }: GlobalContextProviderProps) {
    const [Products, setProducts] = useState<ProductData[]>([]);
    const hasFetched = useRef(false); // Track if API call has been made

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true; // Mark as fetched
            fetchProducts()
                .then((data) => setProducts(data))
                .catch((error) => console.error("Error fetching products:", error));
        }
    }, []);

    return (
        <GlobalContextData.Provider value={{ Products }}>
            {children}
        </GlobalContextData.Provider>
    );
}
