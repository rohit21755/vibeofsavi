"use client";
import React, { useEffect, useState, createContext, ReactNode, useRef } from "react";
import { ProductData } from "@/type/NewProduct";
import { fetchProducts } from "@/services/apiServies";
import Loader from "@/components/Loader";

interface GlobalContextType {
    Products: ProductData[];
    loading: boolean;
    colors: String[]
}

export const GlobalContextData = createContext<GlobalContextType>({ Products: [], loading: true, colors: [] });

interface GlobalContextProviderProps {
    children: ReactNode;
}

export function GlobalContextProvider({ children }: GlobalContextProviderProps) {
    const [Products, setProducts] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState(true);
    const [luxuryProducts, setLuxuryProducts] = useState<ProductData[]>([]);
    const hasFetched = useRef(false); // Track if API call has been made
    const [colors, setColors] = useState<String[]>([])

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true; // Mark as fetched
            setLoading(true);
            fetchProducts()
                .then((data) => {
                    setProducts(data);
    
                    // Extract unique colors from all product variants
                    const allColors = data.flatMap((product: ProductData) =>
                        product.variation.map((variant) => variant.color)
                    );
                    const uniqueColors: String[] = Array.from(new Set(allColors));
                    console.log(uniqueColors)
                    setColors(uniqueColors);
    
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                    setLoading(false);
                });
        }
    }, []);

    // Display the loader outside the provider to avoid rendering issues

    return (
        <GlobalContextData.Provider value={{ Products, loading, colors: colors }}>
            {children}
        </GlobalContextData.Provider>
    );
}
