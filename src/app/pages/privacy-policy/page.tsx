'use client'
import React from 'react'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer'

const policies = [
    {
        title: "Terms and Conditions",
        sections: [
            { heading: "Acceptance of Terms", content: "By accessing or using our website, you agree to be bound by these Terms." },
            { heading: "User Conduct", content: "You agree not to engage in any activity that disrupts or interferes with the functioning of the website or its services." },
            { heading: "Intellectual Property", content: "All content and materials available on the website are protected by intellectual property laws." },
            { heading: "Limitation of Liability", content: "We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the website." },
            { heading: "Indemnification", content: "You agree to indemnify and hold us harmless from any claims, losses, liabilities, damages, costs, and expenses arising out of or relating to your use of the website." },
            { heading: "Governing Law", content: "These Terms and Conditions shall be governed by and construed in accordance with the laws of India." }
        ]
    },
    {
        title: "Privacy Policy",
        sections: [
            { heading: "Information We Collect", content: "We collect personal information such as your name, email address, and payment details when you place an order or sign up for our newsletter." },
            { heading: "How We Use Your Information", content: "We use your information to process your orders, communicate with you, and improve our services." },
            { heading: "Cookies", content: "We use cookies to personalize content, analyze our traffic, and improve your browsing experience." },
            { heading: "Data Security", content: "We take precautions to protect your information both online and offline." },
            { heading: "Changes to This Privacy Policy", content: "We reserve the right to update or change our Privacy Policy at any time." }
        ]
    },
    {
        title: "Refund Policy",
        sections: [
            { heading: "Refund Process", content: "If a refund is approved, the amount will be credited to the customer's account within 5-7 working days." }
        ]
    },
    {
        title: "Return Policy",
        sections: [
            { heading: "Return Eligibility", content: "We have a 7-day return policy, which means you have 7 days after receiving your item to request a return." }
        ]
    },
    {
        title: "Shipping Policy",
        sections: [
            { heading: "Delivery Time", content: "All purchased products will be delivered within 5-7 days." }
        ]
    }
];

const Policy = () => {
    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuOne />
                <Breadcrumb heading='Policies' subHeading='Policies & Terms' />
            </div>
            <div className='policies md:py-20 py-10'>
                <div className="container max-w-4xl mx-auto px-5">
                    {policies.map((policy, index) => (
                        <div key={index} className="mb-10">
                            <h2 className="text-2xl font-bold border-b pb-2 mb-4">{policy.title}</h2>
                            {policy.sections.map((section, secIndex) => (
                                <div key={secIndex} className="mb-4">
                                    <h3 className="text-lg font-semibold">{section.heading}</h3>
                                    <p className="text-gray-700">{section.content}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <p className='m-8 font-bold text-xl'>This webiste is own by VIBE OF SAVI.</p>
            </div>
            <Footer />
        </>
    )
}

export default Policy;
