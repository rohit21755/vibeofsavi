import { add } from "next-video/dist/utils/logger.js";

const url = "http://localhost:4000/api";

export const APIS = {
    login : url + "/user/login",

    // get all products
    getProducts : url + "/product/all",
    fetchWishlist : url + "/wishlist/",
    addToWishlist : url + "/wishlist/",
    removeFromWishlist : url + `/wishlist/`,

    getCart: url + "/cart/",
    addToCart: url + "/cart/",
    removeFromCart: url + "/cart/",
    
}