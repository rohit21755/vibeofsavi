'use client'
import React, { useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { createAddress, updateAddress } from '@/services/apiServies'
import axios from 'axios'
import { APIS } from '@/apiconfig'
import { it } from 'node:test'
import { access } from 'fs'
interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    size: string;
    productImage: string;
    productName: string;
}

interface Order {
    id: number;
    userId: number;
    address: string;
    state: string;
    paid: boolean;
    totalAmount: number;
    createdAt: string;
    merchantOrderId: string;
    orderItems: OrderItem[];
}
const MyAccount = () => {
    const [activeTab, setActiveTab] = useState<string | undefined>('orders')
    const [activeAddress, setActiveAddress] = useState<string | null>('billing')
    const [openDetail, setOpenDetail] = useState<boolean | undefined>(false)
    const [activeOrders, setActiveOrders] = useState<'all' | 'pending' | 'delivery' | 'completed' | 'canceled'>('all');

    const { data: session, status, update } = useSession()
    const addressRef = useRef<HTMLInputElement>(null)
    const cityRef = useRef<HTMLInputElement>(null)
    const stateRef = useRef<HTMLInputElement>(null)
    const zipRef = useRef<HTMLInputElement>(null)
    const [orders, setOrders] = useState<Order[]>([])
    const handleActiveAddress = (order: string) => {
        setActiveAddress(prevOrder => prevOrder === order ? null : order)
    }
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get(APIS.getOrders, {
                headers: {
                    Authorization: `${session?.accessToken}`
                }
            })
            // setOrders(response.data.orders)
            console.log(response.data.orders)
            setOrders(response.data.orders)
        }
        fetchOrders()
    }, [session])
    useEffect(() => {
        
    }, [orders])
    const handleActiveOrders = (orderState: 'all' | 'pending' | 'delivery' | 'completed' | 'canceled') => {
        setActiveOrders(orderState);
    };
    
    const filteredOrders = orders.filter(order => {
        if (activeOrders === 'all') return true; // Show all orders
        return order.state.toLowerCase() === activeOrders; // Match order state
    });
    
    const router = useRouter()
    
    useEffect(() => {
        if (!session) {
            router.push('/login')
        }
        else {
           
            if(session.user.address) {
            if (addressRef.current) {
                addressRef.current.value = session.user.address.address;
            }
            if (cityRef.current) {
                cityRef.current.value = session.user.address.city;
            }
            if (stateRef.current) {
                stateRef.current.value = session.user.address.state;
            }
            if (zipRef.current) {
                zipRef.current.value = String(session.user.address.zip);
            }
        }
        }
    }, [session])
    function handleLogout() {
        signOut()
    }

    async function handleSaveAddress(e:any) {
        e.preventDefault()
        
        if(session?.user.address.id){
            let addressData = {
                id: session.user.address.id,
                address: String(addressRef.current?.value),
                city: String(cityRef.current?.value),
                state: String(stateRef.current?.value),
                zip: Number(zipRef.current?.value)
            }
            let accessToken = session?.accessToken
            const response = await updateAddress(
                addressData, accessToken
            )
            update({user: {...session.user, address: response?.data.address}})
            
           
           
        }  
        else if(session?.accessToken) {
            let addressData = {
                address: String(addressRef.current?.value),
                city: String(cityRef.current?.value),
                state: String(stateRef.current?.value),
                zip: Number(zipRef.current?.value)
            }
            let accessToken = session?.accessToken
            const response = await createAddress(
                addressData, accessToken
            )
            update({user: {...session.user, address: response?.data.address}})
            
        }
        else {
            console.log("error")
            alert("Please login to save address")
            router.push("/login")
        }
    }

    return (
        <>
      
            <div id="header" className='relative w-full'>
                <MenuOne  />
                <Breadcrumb heading='My Account' subHeading='My Account' />
            </div>
            <div className="profile-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col w-full">
                        <div className="left md:w-1/3 w-full xl:pr-[3.125rem] lg:pr-[28px] md:pr-[16px]">
                            <div className="user-infor bg-surface lg:px-7 px-4 lg:py-10 py-5 md:rounded-[20px] rounded-xl">
                                <div className="heading flex flex-col items-center justify-center">
                                    
                                    <div className="name heading6 mt-4 text-center">{session?.user?.name}</div>
                                    <div className="mail heading6 font-normal normal-case text-secondary text-center mt-1">{session?.user?.email}</div>
                                   
                                </div>
                                <div className="menu-tab w-full max-w-none lg:mt-10 mt-6">
                                    <Link href={'#!'} scroll={false} className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                                        <Icon.HouseLine size={20} />
                                        <strong className="heading6">Orders</strong>
                                    </Link>
                                    
                                    <Link href={'#!'} scroll={false} className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5 ${activeTab === 'address' ? 'active' : ''}`} onClick={() => setActiveTab('address')}>
                                        <Icon.Tag size={20} />
                                        <strong className="heading6">My Address</strong>
                                    </Link>
                                    
                                    <button onClick={handleLogout}  className="item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5">
                                        <Icon.SignOut size={20} />
                                        <strong className="heading6">Logout</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="right md:w-2/3 w-full pl-2.5">
                            
                            <div className={`tab text-content overflow-hidden w-full p-7 border border-line rounded-xl ${activeTab === 'orders' ? 'block' : 'hidden'}`}>
                                <h6 className="heading6">Your Orders</h6>
                                <div className="w-full overflow-x-auto">
                                    <div className="menu-tab grid grid-cols-5 max-lg:w-[500px] border-b border-line mt-3">
                                        {['all', 'pending', 'delivery', 'completed', 'canceled'].map((item, index) => (
                                            <button
                                                key={index}
                                                className={`item relative px-3 py-2.5 text-secondary text-center duration-300 hover:text-black border-b-2 ${activeOrders === item ? 'active border-black' : 'border-transparent'}`}
                                                //@ts-ignore
                                                onClick={() => handleActiveOrders(item)}
                                            >
                                                {/* {activeOrders === item && (
                                                <motion.span layoutId='active-pill' className='absolute inset-0 border-black border-b-2'></motion.span>
                                                )} */}
                                                <span className='relative text-button z-[1]'>
                                                    {item}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="list_order">
    {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
            <div key={order.id} className="order_item mt-5 border border-line rounded-lg box-shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-line">
                    <div className="flex items-center gap-2">
                        <strong className="text-title">Order Number:</strong>
                        <strong className="order_number text-button uppercase">{order.merchantOrderId.slice(0, 21)}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                        <strong className="text-title">Order status:</strong>
                        <span className="tag px-4 py-1.5 rounded-full bg-opacity-10 bg-purple text-purple caption1 font-semibold">
                            {order.state.toUpperCase()}
                        </span>
                    </div>
                </div>
                <div className="list_prd px-5">
                    {order.orderItems.map(item => (
                        <div key={item.id} className="prd_item flex flex-wrap items-center justify-between gap-3 py-5 border-b border-line">
                            <div className="flex items-center gap-5">
                                <div className="bg-img flex-shrink-0 md:w-[100px] w-20 aspect-square rounded-lg overflow-hidden">
                                    <Image
                                        src={item.productImage}
                                        width={1000}
                                        height={1000}
                                        alt={item.productName}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div>
                                    <div className="prd_name text-title">{item.productName}</div>
                                    <div className="caption1 text-secondary mt-2">
                                        <span className="prd_size uppercase">{item.size}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='text-title'>
                                <span className="prd_quantity">{item.quantity}</span>
                                <span> X </span>
                                <span className="prd_price">₹{item.price}.00</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap gap-4 p-5">
                    <button className="button-main bg-surface border border-line hover:bg-black text-black hover:text-white">Cancel Order</button>
                </div>
            </div>
        ))
    ) : (
        <p className="text-secondary text-center mt-5">No orders found</p>
    )}
</div>

                            </div>
                            <div className={`tab_address text-content w-full p-7 border border-line rounded-xl ${activeTab === 'address' ? 'block' : 'hidden'}`}>
                                <form>
                                    <button
                                        type='button'
                                        className={`tab_btn flex items-center justify-between w-full pb-1.5 border-b border-line ${activeAddress === 'billing' ? 'active' : ''}`}
                                        onClick={() => handleActiveAddress('billing')}
                                    >
                                        <strong className="heading6">Address</strong>
                                        <Icon.CaretDown className='text-2xl ic_down duration-300' />
                                    </button>
                                    <div className={`form_address ${activeAddress === 'billing' ? 'block' : 'hidden'}`}>
                                        <div className='grid sm:grid-cols-2 gap-4 gap-y-5 mt-5'>
                                            
                                           
                                           
                                            <div className="street">
                                                <label htmlFor="billingStreet" className='caption1 capitalize'>street address <span className='text-red'>*</span></label>
                                                <input ref={addressRef} defaultValue={addressRef.current ? addressRef.current.value : ''} className="border-line mt-2 px-4 py-3 w-full rounded-lg" id="billingStreet" type="text" required />
                                            </div>
                                            <div className="city">
                                                <label htmlFor="billingCity" className='caption1 capitalize'>Town / city <span className='text-red'>*</span></label>
                                                <input ref={cityRef} defaultValue={cityRef.current ? cityRef.current.value : ''} className="border-line mt-2 px-4 py-3 w-full rounded-lg" id="billingCity" type="text" required />
                                            </div>
                                            <div className="state">
                                                <label htmlFor="billingState" className='caption1 capitalize'>state <span className='text-red'>*</span></label>
                                                <input ref={stateRef} defaultValue={stateRef.current ? stateRef.current.value : ''} className="border-line mt-2 px-4 py-3 w-full rounded-lg" id="billingState" type="text" required />
                                            </div>
                                            <div className="zip">
                                                <label htmlFor="billingZip" className='caption1 capitalize'>ZIP <span className='text-red'>*</span></label>
                                                <input ref={zipRef} defaultValue={zipRef.current ? zipRef.current.value : ''} className="border-line mt-2 px-4 py-3 w-full rounded-lg" id="billingZip" type="number" required />
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="block-button lg:mt-10 mt-6">
                                        <button onClick={(e)=>handleSaveAddress(e)} className="button-main">Update Address</button>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
           
        </>
    )
}

export default MyAccount