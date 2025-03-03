'use client'
import React, { useState } from 'react'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr";

const Faqs = () => {
    const [activeTab, setActiveTab] = useState<string | undefined>('how to buy')
    const [activeQuestion, setActiveQuestion] = useState<string | undefined>('')

    const handleActiveTab = (tab: string) => {
        setActiveTab(tab)
    }

    const handleActiveQuestion = (question: string) => {
        setActiveQuestion(prevQuestion => prevQuestion === question ? undefined : question)
    }
    const faqs = [
        {
          id: 1,
          title: "How can I track the status of my order?",
          content: "We usually ship our orders in 3-5 working days. At the time of shipping the order you will get a notification on the registered E-mail address and mobile Number along with the details of shipping partner and tracking ID. You can also track your order on………………."
        },
        {
          id: 2,
          title: "Are there any shipping charges applicable?",
          content: "Shipping charges of Rs. 90 will be applicable on the orders below Rs. 2000/-. Further, these shipping charges will not be refundable in case of return."
        },
        {
          id: 3,
          title: "How much time does it take to receive my order?",
          content: "Your order will be dispatched within 3-5 working days. The details of shipment will be sent to the registered E-mail id and mobile no. at the time of dispatch. However, the timeline provided will be based on the estimates provided by our delivery partner and any unforeseen situations may cause delay."
        },
        {
          id: 4,
          title: "Items are missing from my order, what should I do?",
          content: "Please note that all our dispatches are made carefully to ensure that no such errors occur. However, in the unfortunate event that this happens, we request you to kindly reach out to us within 24 hours of delivery on any of the support channels (Call/Email) with an unpacking video and we would be delighted to help you. We will be doing an in-depth investigation and would require 5-7 working days for the same. Your patience during this period would be greatly appreciated."
        },
        {
          id: 5,
          title: "What is vibe of savi’s returns/exchange policy?",
          content: "All the purchase can be returned/exchanged within 24 hours (some exceptions apply). To be eligible to return/exchange, items must be in their original condition, unworn and unwashed with complete accessories, and the original packaging and tags must also be intact and in their original condition."
        },
        {
          id: 6,
          title: "How do I return/exchange an order?",
          content: "You will have to put a return/exchange request on the website. After receiving the request, our delivery partner will come and inspect the product. The return request/exchange request will be processed only when the product is eligible for the same. Further, in case of exchange, standard delivery charges will apply."
        },
        {
          id: 7,
          title: "How do I return a defective or flawed product?",
          content: "If your item is potentially defective or faulty, and it's been less than 24 hours since your product delivery, simply return the item."
        },
        {
          id: 8,
          title: "How much time to get a refund of the returned item?",
          content: "Once we receive your return, it usually takes us four business days to process it after inspection and issue a refund. We send the notification on the registered mobile number and email when we've initiated the refund, but it may take up to 10 additional business days for your account to reflect the funds. Your refund will include the total value of any returned items—delivery fees are not refundable. Refunds are processed in the same bank account used to place the order—we cannot change the bank account associated with the refund."
        },
        {
          id: 9,
          title: "Can I Cancel or Change My Order?",
          content: "You can make changes or cancel your order until they are dispatched. No changes in the order can be made once they are dispatched."
        },
        {
          id: 10,
          title: "How do refunds work for cancelled orders?",
          content: "If you cancel an order, we'll automatically start processing your refund for most payment options (if payment was collected). We send the notification on the registered mobile number and email when we've initiated the refund, but it may take up to 10 additional business days for your account to reflect the funds."
        },
        {
          id: 11,
          title: "Can I change the delivery address for my order?",
          content: "Depending on the status of your custom order, we may be able to change your delivery address. No changes in the delivery address can be made once they are dispatched."
        },
        {
          id: 12,
          title: "How Do I Find the Right Size and Fit?",
          content: "When it comes to aesthetics, fitting matters. We'll help you find the right clothing in the right size so you can be at your best. If you are not sure of your size, our size charts can help you determine the best fit. On our size charts page, you can access drop-down menus to navigate to specific size charts for men, women and kids."
        },
        {
          id: 13,
          title: "How can I get the best deals?",
          content: "The best way to be aware of our latest offers and deals is to become a member of vibe of savi. As a Member, you'll enjoy Member-only access to everyday deals, special offers and milestone celebrations, including an annual birthday discount."
        },
        {
          id: 14,
          title: "When will the product be available again?",
          content: "We don't have a set schedule for restocking items—we refill our inventory as soon as stock is available, so check vibe of savi website for updates. Further, you can opt for update notifications. In that case, a notification will be sent to your registered mobile number and email, once the product is in stock."
        },
        {
          id: 15,
          title: "What is the personalisation policy?",
          content: "You can get personalised fittings in size on most of our products. In that case, you need to write a personalized message with your order with the exact size. In some cases, additional charges may apply and the product may take some additional time for dispatch."
        },
        {
          id: 16,
          title: "My Payment Failed While Making A Purchase but the amount was deducted. What Should I Do?",
          content: "Mail us the details of your transaction to ……………., we will verify and get back to you at the earliest."
        },
        {
          id: 17,
          title: "Where and how can I order from vibe of savi?",
          content: "You can order from the website, by sending personal messages on Instagram and Facebook."
        }
      ];

    return (
        <>
            {/* <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" /> */}
            <div id="header" className='relative w-full'>
                <MenuOne  />
                <Breadcrumb heading='FAQs' subHeading='FAQs' />
            </div>
            <div className='faqs-block md:py-20 py-10'>
                <div className="container">
                    <div className="flex justify-between">
                        
                        <div className="w-full">
                            <div className={`tab-question flex flex-col gap-5 ${activeTab === 'how to buy' ? 'active' : ''}`}>
                                {faqs.map((faq) => {
                                    return<>
                                    <div
                                    className={`question-item px-7 py-5 rounded-[20px] overflow-hidden border border-line cursor-pointer ${activeQuestion === '1' ? 'open' : ''}`}
                                    onClick={() => handleActiveQuestion(String(faq.id))}
                                >
                                    <div className="heading flex items-center justify-between gap-6">
                                        <div className="heading6">{faq.title}</div>
                                        <Icon.CaretRight size={24} />
                                    </div>
                                    <div className="content body1 text-secondary">{faq.content}</div>
                                </div>
                                    </>
                                })}
                                
                                
                                
                                
                            </div>
                            
                           
                            
                            
                            
                           
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Faqs