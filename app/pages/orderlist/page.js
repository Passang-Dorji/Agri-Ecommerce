"use client"
import { useState } from "react"

export default function Home() {
    const [orders,setOrders]=useState([])
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
        <div>
            <button
                className="text-black px-4 mt-7 ml-4 border-3 rounded full bg-white"
                onClick={getProducts}
            >
                ordered products
            </button>
            <div className="text-white">
                {orders.map((order) =>{
                    return(
                        <div className=" border-2 rounded-lg px-3 py-3 w-2/3 text-white mt-7 ml-4"key={order.id}>
                            <p>Product Name : {order.product_name}</p>
                            <p>Ordered Amount : {order.amount} KG</p>
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
	
