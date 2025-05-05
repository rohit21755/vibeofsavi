'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import { ProductType } from '@/type/ProductType'
import axios from 'axios'
import Product from '@/components/Product/Product'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from '@/context/CartContext'
import { useSearchParams } from 'next/navigation';
import { ProductData } from '@/type/NewProduct';
import { useContext } from 'react';
import { GlobalContextData } from '@/context/GlobalContext';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { updateAddress, createAddress } from '@/services/apiServies'

interface ProductMain {
    cartId: number;
    product: ProductData;
    quantityMain: number;
    userSize: string;
    userColor: string;

}
const Checkout = () => {
    const searchParams = useSearchParams()
    let discount = searchParams.get('discount')
    let ship = searchParams.get('ship')
    const { Products } = useContext(GlobalContextData);
    const { cartState } = useCart();
    let [totalCart, setTotalCart] = useState<number>(0)
    const [activePayment, setActivePayment] = useState<string>('credit-card')
    const [products, setProducts] = useState<ProductMain[]>([]);
    const { data: session, status, update } = useSession()
    const [isUpdatingAddress, setIsUpdatingAddress] = useState<boolean>(false);
    const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
    const [addressForm, setAddressForm] = useState({
        address: session?.user?.address?.address || '',
        city: session?.user?.address?.city || '',
        state: session?.user?.address?.state || '',
        zip: session?.user?.address?.zip || ''
    });
    
    const router = useRouter()
    async function handlePayment() {
        if(!session?.user?.address) {
            alert("Please add address first")
            return
        }
        let total = 0
        const productsOrder = products.map((item) => {
            const price = item.product.sale ? item.product.price : item.product.originPrice;
            total += price * item.quantityMain
            return {
                productId: Number(item.product.id),
                quantity: Number(item.quantityMain),
                size: String(item.userSize) || "S",
                price: Number(price),
            }
        })
        const data = {
            address: `${session?.user?.address?.address}, ${session?.user?.address?.city}, ${session?.user?.address?.state}, ${session?.user?.address?.zip}`,
            totalAmount: Number(total),
            orderItems: productsOrder,
        }
        console.log(data)
        try{
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`, data, {
                    headers: {
                        Authorization: `${session?.accessToken}`
                    }
                })
            
                window.location.href = response.data.checkoutPageUrl
        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!session){
            router.push('/login')
        }
        if (session?.user?.address) {
            setAddressForm({
                address: session.user.address.address,
                city: session.user.address.city,
                state: session.user.address.state,
                zip: session.user.address.zip
            });
        }
        const newProducts: ProductMain[] = cartState.cartArray.map((item) => {
            const product = Products.find((product) => Number(product.id) === item.productId);
            if (product) {
                //@ts-ignore
                return { cartId: item.id, product, quantityMain: item.quantity, userSize: item.size || '' };
            }
            return undefined;
        }).filter((item): item is ProductMain => item !== undefined);
        
        setProducts(newProducts);
        
        // Calculate subtotal
        const subtotal = newProducts.reduce((acc, item) => {
            const price = item.product.sale ? item.product.price : item.product.originPrice;
            return acc + price * item.quantityMain;
        }, 0);
        setTotalCart(subtotal);
    }, [cartState.cartArray, Products]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddressForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateAddress = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!session?.user || !session?.accessToken) {
            alert("Please login to update address");
            return;
        }
    
        try {
            setIsUpdatingAddress(true);
    
            const addressData = {
                address: addressForm.address,
                city: addressForm.city,
                state: addressForm.state,
                zip: Number(addressForm.zip)
            };
    
            // Safely check if address ID exists
            const existingAddressId = session.user.address?.id;
            console.log(existingAddressId)
            if (existingAddressId) {
                // Update existing address
                const response = await updateAddress(
                    { id: existingAddressId, ...addressData },
                    session.accessToken
                );
    
                if (response?.data?.address) {
                    await update({
                        address: {
                            id: response.data.address.id,
                            ...addressData
                        }
                    });
    
                    setShowAddressForm(false);
                    alert("Address updated successfully");
                } else {
                    alert("Failed to update address: Invalid response");
                }
            } else {
                // Create new address
                const response = await createAddress(addressData, session.accessToken);
    
                if (response?.data?.address) {
                    await update({
                        address: {
                            id: response.data.address.id,
                            ...addressData
                        }
                    });
    
                    setShowAddressForm(false);
                    alert("Address saved successfully");
                } else {
                    alert("Failed to save address: Invalid response");
                }
            }
        } catch (error) {
            console.error("Error updating address:", error);
            alert("Failed to update address");
        } finally {
            setIsUpdatingAddress(false);
        }
    };
    

    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuOne  />
                <Breadcrumb heading='Shopping cart' subHeading='Shopping cart' />
            </div>
            <div className="cart-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex justify-between">
                        <div className="left w-1/2">
                            
                            
                            <div className="information mt-5">
                                <div className="heading5">Address</div>
                                {!showAddressForm ? (
                                    <>
                                        {session?.user?.address ? <div className='mt-3'>{session?.user?.address?.address}, {session?.user?.address?.city}, {session?.user?.address?.state}, {session?.user?.address?.zip}</div> : <div className='mt-3'>No address Found</div>}
                                        <div className="form-checkout mt-5">
                                            <button 
                                                onClick={() => setShowAddressForm(true)} 
                                                className="button mt-6 w-full"
                                            >
                                                {session?.user?.address ? "Update Address" : "Add Address"}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <form onSubmit={handleUpdateAddress} className="mt-5">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label htmlFor="address" className="caption1 capitalize">Street Address <span className="text-red">*</span></label>
                                                <input 
                                                    id="address"
                                                    name="address"
                                                    value={addressForm.address}
                                                    onChange={handleAddressChange}
                                                    className="border-line mt-2 px-4 py-3 w-full rounded-lg" 
                                                    type="text" 
                                                    required 
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="city" className="caption1 capitalize">City <span className="text-red">*</span></label>
                                                <input 
                                                    id="city"
                                                    name="city"
                                                    value={addressForm.city}
                                                    onChange={handleAddressChange}
                                                    className="border-line mt-2 px-4 py-3 w-full rounded-lg" 
                                                    type="text" 
                                                    required 
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="state" className="caption1 capitalize">State <span className="text-red">*</span></label>
                                                <input 
                                                    id="state"
                                                    name="state"
                                                    value={addressForm.state}
                                                    onChange={handleAddressChange}
                                                    className="border-line mt-2 px-4 py-3 w-full rounded-lg" 
                                                    type="text" 
                                                    required 
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="zip" className="caption1 capitalize">ZIP <span className="text-red">*</span></label>
                                                <input 
                                                    id="zip"
                                                    name="zip"
                                                    value={addressForm.zip}
                                                    onChange={handleAddressChange}
                                                    className="border-line mt-2 px-4 py-3 w-full rounded-lg" 
                                                    type="number" 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-3 mt-5">
                                            <button 
                                                type="button" 
                                                onClick={() => setShowAddressForm(false)}
                                                className="button-secondary flex-1"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                type="submit" 
                                                className="button-main flex-1"
                                                disabled={isUpdatingAddress}
                                            >
                                                {isUpdatingAddress ? 'Updating...' : 'Update Address'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                                
                                <div className="block-button md:mt-10 mt-6">
                                    <button 
                                        onClick={handlePayment} 
                                        className={`button-main w-full ${!session?.user?.address ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!session?.user?.address}
                                    >
                                        {!session?.user?.address ? 'Please Add Address First' : 'Payment'}
                                    </button>
                                </div>
                                
                                
                                  
                                
                          
                            </div>

                        </div>
                        <div className="right w-5/12">
                            <div className="checkout-block">
                                <div className="heading5 pb-3">Your Order</div>
                                <div className="list-product-checkout">
                                    {cartState.cartArray.length < 1 ? (
                                        <p className='text-button pt-3'>No product in cart</p>
                                    ) : (
                                        products.map((product) => (
                                            <>
                                                <div className="item flex items-center justify-between w-full pb-5 border-b border-line gap-6 mt-5">
                                                    <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={product.product.thumbImage[0]}
                                                            width={500}
                                                            height={500}
                                                            alt='img'
                                                            className='w-full h-full'
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between w-full">
                                                        <div>
                                                            <div className="name text-title">{product.product.name}</div>
                                                            <div className="caption1 text-secondary mt-2">
                                                                <span className='size capitalize'>{product.userSize || 'S'}</span>
                                                                <span>/</span>
                                                                <span className='color capitalize'>{product.userColor}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-title">
                                                            <span className='quantity'>{product.quantityMain}</span>
                                                            <span className='px-1'>x</span>
                                                            <span>
                                                            ₹{product.product.sale ? product.product.price : product.product.originPrice}.00
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    )}
                                </div>
                                <div className="discount-block py-5 flex justify-between border-b border-line">
                                    <div className="text-title">Discounts</div>
                                    <div className="text-title">- ₹<span className="discount">{discount}</span><span>.00</span></div>
                                </div>
                                <div className="ship-block py-5 flex justify-between border-b border-line">
                                    <div className="text-title">Shipping</div>
                                    <div className="text-title">{Number(ship) === 0 ? 'Free' : `₹${ship}.00`}</div>
                                </div>
                                <div className="total-cart-block pt-5 flex justify-between">
                                    <div className="heading5">Total</div>
                                    <div className="heading5 total-cart">₹{totalCart - Number(discount) + Number(ship)}.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout