"use client"
import axios from "axios"
export default function PaymentPage() {
    async function handlePayment() {
        console.log('payment')
        const data = { 
            name: 'Vibe of Savi',
            amount: 100,
            mobileNumber: '1234567890',
        }
        try{
                const response = await axios.post('http://localhost:4000/api/payment/create-order', data)
                console.log(response.data)
                window.location.href = response.data.url
        }
        catch(err) {
            console.log(err)
        }
    }
    return <>
    <div className="flex justify-center items-center mt-28">
        hi there
    <button onClick={handlePayment}>Pay</button>
    </div>
    </>
}