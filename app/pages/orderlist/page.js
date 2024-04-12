"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function Home() {
    const [orders,setOrders]=useState([])
    const router = useRouter()
    async function getProducts() {
        try{
            const response = await fetch('/api/query');
                if(!response.ok){
                    throw new Error("network response was not okay");
                }
                const { data } = await response.json();
                console.log(data)
                setOrders(data)
        }catch (error){
            console.error("error fetching details",error)
        }
    }
    return (
        <div className="min-h-screen"
            style = {{backgroundImage:"url('https://marketplace.canva.com/EAE04Hc76xE/1/0/1600w/canva-green-floral-agriculture-organic-wheat-farm-logo-design-EopC-HgEgK8.jpg')",
            backgroundSize: 'screen',backgroundPosition: 'center'}}
        >
            <button 
                className=" text-2xl text-black px-4 py-4 mt-7 ml-4 border-2 rounded-full bg-transparent/50 font-bold"
                onClick={getProducts}
            >
                Ordered Products
            </button>
            <button 
                className="text-black border-2 rounded-full bg-transparent/50 text-2xl py-4 px-4 font-bold"
                onClick={()=> router.push('/pages/createpdt')}
            >Add New Products</button>
            <div className="text-white ">
                {orders.map((order) =>{
                    return(
                        <div className=" bg-transparent/50 rounded-2xl border-2 rounded-lg pl-4 py-3 w-1/2 text-white mt-7 ml-4"
                        key={order.id}>
                            <p>Product Name : {order.product_name}</p>
                            <p>Ordered Amount : {order.ordered_quantity} KG</p>
                            <p>Ordered Date : {order.order_date}</p>
                            <p>Payment Method : {order.payment_method}</p>
                            <p>Payment Status : {order.payment_status}</p>
                            <p>Customer Name : {order.customer_name}</p>
                            <p>Shipping Address : {order.shipping_address}</p>
                            <p>Contact Info : {order.contact}</p>
                            
                        </div>
                    )
                })}
            </div>
         </div>
    )
}
	
