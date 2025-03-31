import axios from "axios";
import Link from "next/link";

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
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%",
            }}
        >
            <div
                style={{
                    height: "80px",
                    width: "400px",
                    borderRadius: "30px",
                    border: "1px solid black",
                    textAlign: "center",
                    margin: "0 auto",
                }}
            >
                <h1>Payment Status {paymentSuccess ? "Succeeded" : "Failed"} {params.merchantOrderId}</h1>
            </div>

            <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Link
                    href="/checkout"
                    style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}
                >
                    Home
                </Link>
            </div>
        </div>
    );
}
