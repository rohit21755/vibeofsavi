import axios from "axios";
import { APIS } from "../../apiconfig";
import { ProductData } from "../type/NewProduct";
function formatedata(data:any){
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
        "variation": data.variants.map(variant => ({
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
export const fetchProducts = async (setProducts: React.Dispatch<React.SetStateAction<ProductData[]>>) => {
    try{
        const response = await axios.get(APIS.getProducts);
        console.log(response.data.products);
        if(response.data.products.length > 0){
            const formattedData = response.data.products.map(data => formatedata(data));
            setProducts(formattedData);
        }
        else {
            setProducts([]);
        }
    }
    catch (error) {
        console.log(error);
    }
}