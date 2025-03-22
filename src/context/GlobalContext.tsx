"use client";
import React, { useEffect, useState, createContext, ReactNode } from "react";
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

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        getProducts();
    }, []);

    return (
        <GlobalContextData.Provider value={{ Products }}>
            {children}
        </GlobalContextData.Provider>
    );
}
