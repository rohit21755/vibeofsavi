import React, { useEffect, useState } from "react";
import { ProductData } from "@/type/NewProduct";
interface GlobalContextType {
    Products: ProductData[];
}
export const GlobalContextData = React.createContext<GlobalContextType>({ Products: [] });
import { ReactNode } from "react";
import { fetchProducts } from "@/services/apiServies";
interface GlobalContextProviderProps {
    children: ReactNode;
}

export async function GlobalContextProvider({ children }: GlobalContextProviderProps) {
    

    let  Products = await fetchProducts();
   
    
    return <GlobalContextData.Provider value={{ Products}}>{children}</GlobalContextData.Provider>;
}
