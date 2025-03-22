export interface ProductData {
    id: string;
    category: string;
    type: string;
    name: string;
    gender: string;
    new: boolean;
    sale: boolean;
    rate: number;
    price: number;
    originPrice: number;
    brand: string;
    sold: number;
    quantity: number;
    quantityPurchase: number;
    sizes: string[];
    variation: {
        color: string;
        colorCode: string;
        colorImage: string;
        image: string;
    }[];
    thumbImage: string[];
    images: string[];
    description: string;
    action: string;
    slug: string;
};
