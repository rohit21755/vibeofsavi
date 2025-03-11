import axios from "axios"
export default function PaymentPage() {
    async function handlePayment() {
        console.log('payment')
        const data = { 
            name: 'Vibe of Savi',
            amount: 100,
            mobile: '1234567890',
        }
        try{
                const response = await axios.post('http://localhost:3000/payment/create-order', data)
                console.log(response)
        }
        catch(err) {
            console.log(err)
        }
    }
    return <>
    <div className="flex justify-center items-center">
        hi there
    </div>
    </>
}