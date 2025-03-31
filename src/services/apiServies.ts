import axios from "axios";
import { APIS } from "../apiconfig";
import { ProductData } from "../type/NewProduct";
import { desc } from "next-video/dist/cli/init.js";
interface CartItem {
    productId: number;
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
}
export function formatedata(data:any){
    return {
        "id": data.id.toString(),
        "category": data.category[0].toLowerCase(),
        "type": data.type.toLowerCase(),
        "name": data.name,
        "gender": "men", // Assuming gender as men since it's in the category
        "new": data.new,
        "sale": data.sale,
        "rate": 4, // Default rating as it's not available in data2
        "price": data.price,
        "originPrice": data.originalPrice,
        "brand": "unknown", // Brand not present in data2
        "sold": data.sold,
        "quantity": data.quantity,
        "quantityPurchase": 1, // Default value
        "sizes": data.sizes,
        "variation": data.variants.map((variant:any) => ({
            "color": variant.color,
            "colorCode": "#000000", // Default black as color code not available
            "colorImage": "/images/product/color/48x48.png", // Placeholder
            "image": variant.images[0] // First image as main image
        })),
        "thumbImage": data.variants[0].images.slice(0, 2), // First two images as thumbnails
        "images": data.variants[0].images, // All images
        "description": data.description,
        "action": "quick shop",
        "slug": data.name.toLowerCase().replace(/\s+/g, "-")
    };
}
export const fetchProducts = async () => {
    try{
        
        const response = await axios.get(APIS.getProducts);
        if(response.data.products.length > 0){
            const formattedData = response.data.products.map((data:any) => formatedata(data));
            return formattedData;
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const fetchWishlist = async (accessToken: string) => {
    try {
        const response = await axios.get(APIS.fetchWishlist, {
            headers: {
                Authorization: `${accessToken}`
            }
        });
       return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const addWishlist = async (accessToken: string, productId: string) => {
    try{
        const response = await axios.post(APIS.addToWishlist, {
            productId: productId
        }, {
            headers: {
                Authorization: `${accessToken}`
            }
        });
        return response
    }
    catch (error) {
        console.log(error);
        return null
    }
}

export const removeWishlist = async (accessToken: string, productId: string) => {
    try{
        const response = await axios.delete(APIS.removeFromWishlist, {
            headers: {
                Authorization: `${accessToken}`
            },
            data: {
                productId: productId
            }
        });
        return response
    }
    catch (error) {
        console.log(error);
        return null
    }
}

export const fetchCart = async (accessToken: string): Promise<CartItem[]> => {
    try {
        const response = await axios.get(APIS.getCart, {
            headers: {
                Authorization: `${accessToken}`
            }
        });
  
    return response.data.cart;
}
catch (error) {
    console.log(error);
    return [];
}
}

export const addToCart = async (accessToken: string, productId: string, quantity: number, selectedSize: string) => {
    try {
        const response = await axios.post(APIS.addToCart, {
            productId: Number(productId),
            quantity: quantity,
            size: selectedSize,
  
        }, {
            headers: {
                Authorization: `${accessToken}`
            }
        });
        return response;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export const removeFromCartMain = async (accessToken: string, productId: number) => {
    try {
        console.log(accessToken)
        const response = await axios.delete(APIS.removeFromCart, {
            headers: {
                Authorization: `${accessToken}`
            },
            data: {
                cartItemId: Number(productId)
            }
        });
        return response;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export const addReview = async (accessToken: string, data: any) => {
    try {

        const response = await axios.post(APIS.addreview, {
            title: data.title,
            rating: data.rating,
            description: data.message,
            productId: Number(data.productId)
        }, {
            headers: {
                Authorization: `${accessToken}`
            }
        });
        return response;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}


export const getReview = async (productId: string) => {
    try{ 
        const response = await axios.post(APIS.getReview, { productId: Number(productId)});
        return response.data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
export const createAddress = async (addressData: {
    address: string;
    city: string;
    state: string;
    zip: number;
    token: string;
}) => {
    try {

        const response = await axios.post(APIS.createAddress, addressData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${addressData.token}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating address:", error);

    }
};
export const updateAddress = async (addressData: {
    id: number;
    address: string;
    city: string;
    state: string;
    zip: number;
    token: string;
}) => {
    try {

        const response = await axios.put(APIS.updateAddress, addressData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${addressData.token}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating address:", error);

    }
};