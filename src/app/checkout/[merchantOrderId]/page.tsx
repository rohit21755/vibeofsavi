import axios from "axios";
import Link from "next/link";
import { FaCheckCircle, FaTimesCircle, FaHome } from "react-icons/fa";

async function getPaymentStatus(orderId: string) {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/payment/get-payment-status?merchantOrderId=${orderId}`
        );
        return response.status === 200;
    } catch (error) {
        console.error("Error fetching payment status:", error);
        return false;
    }
}

export default async function CheckoutPage({ params }: { params: { merchantOrderId: string } }) {
    const paymentSuccess = await getPaymentStatus(params.merchantOrderId);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full transform transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center space-y-6">
                    <div className={`text-6xl ${paymentSuccess ? 'text-green-500' : 'text-red-500'}`}>
                        {paymentSuccess ? <FaCheckCircle /> : <FaTimesCircle />}
                    </div>
                    
                    <h1 className={`text-2xl font-bold ${paymentSuccess ? 'text-green-600' : 'text-red-600'}`}>
                        Payment {paymentSuccess ? 'Successful' : 'Failed'}
                    </h1>
                    
                    <p className="text-gray-600 text-center">
                        Order ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{params.merchantOrderId}</span>
                    </p>
                    
                    <Link
                        href="/checkout"
                        className="mt-6 flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        <FaHome />
                        <span>Return to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
