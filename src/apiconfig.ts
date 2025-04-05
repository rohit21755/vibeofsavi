

const url = process.env.NEXT_PUBLIC_API_URL;

export const APIS = {
    login : url + "/user/login",
    register : url + "/user/signup",

    // get all products
    getProducts : url + "/product/all",
    fetchWishlist : url + "/wishlist/",
    addToWishlist : url + "/wishlist/add",
    removeFromWishlist : url + `/wishlist/remove`,

    getCart: url + "/cart/",
    addToCart: url + "/cart/add",
    removeFromCart: url + "/cart/delete",
    addreview: url + "/user/review",
    getReview: url + "/product/reviews",

    // address
    createAddress: url + "/address/create",
    updateAddress: url + "/address/update",
    // 
    getOrders: url + "/user/orders",

    // user
    cancelOrder: url + "/user/cancel-order",
    returnOrder: url + "/user/return-order",
    getReturnStatus: url + "/user/return-status"
}