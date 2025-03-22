import React, { useEffect, useState } from "react";
import { ProductData } from "@/type/NewProduct";
export const GlobalContextData = React.createContext({});
import { ReactNode } from "react";
import { fetchProducts } from "@/services/apiServies";
interface GlobalContextProviderProps {
    children: ReactNode;
}

export function GlobalContextProvider({ children }: GlobalContextProviderProps) {
    const [Products,setProducts] = useState<ProductData[]>([]);

    function fetchProductsData() {
        fetchProducts(setProducts)
    }
    useEffect(() => {
        fetchProductsData();
    }, []);
    
    return <GlobalContextData.Provider value={{ Products, setProducts }}>{children}</GlobalContextData.Provider>;
}
