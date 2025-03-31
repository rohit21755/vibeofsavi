
import axios from "axios"

import Link from "next/link"
export default async function CheckoutPage({params}: {
    params: {
        merchantOrderId: string
    }
}) {

    const id = (await params).merchantOrderId
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/get-payment-status?orderId=${id}`) 
   

    return <>
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
    }}>
        <div style={{
            height: "80px",
            width: "400px",
            borderRadius: "30px",
            border: "1px solid black",
            textAlign: "center",
            margin: "0 auto",
        }}>
            {response.status===200 ? <h1>Payment Status Succeed {(await params).merchantOrderId}</h1> : <h1>Payment Status Failed</h1>}
        </div>

        <div style={{
            textAlign: "center",
            margin: "0 auto",
        }}>
            <Link href={"/checkout"} style={{
                textDecoration: "none",
                color: "black",
                fontSize: "20px",
                fontWeight: "bold",
            }}>
                Home
            </Link>
        </div>
    </div>
    </>

    
    
  
}