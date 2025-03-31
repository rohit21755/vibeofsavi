import { create } from "domain";

const url = process.env.NEXT_PUBLIC_API_URL;

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
    addreview: url + "/user/review",
    getReview: url + "/product/reviews",

    // address
    createAddress: url + "/address/create",
    updateAddress: url + "/address/update",
}