import axios from "axios";
import { APIS } from "../../apiconfig";
import { ProductData } from "../type/NewProduct";
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
        console.log(response.data.wishlist);
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