"use client"
import { useState } from "react"

export default function MakeOrder() {
    const [userId,setUserId]=useState()
    const [amount,setAmount]=useState()
    const [orderStatus,setOrderStatus]=useState()
    const [shippingAddress,setShippingAddress]=useState()
    const [paymentMethod,setPaymentMethod]=useState()
    const [paymentStatus,setPaymentStatus]=useState()
    async function makeOrder() {
        try{
            const response = await fetch('/api/orders',{
                method: 'POST',
                body: JSON.stringify({
                    userId,
                    amount,
                    orderStatus,
                    shippingAddress,
                    paymentMethod,
                    paymentStatus
                })
            });
                if(!response.ok){
                    throw new Error("network response was not okay");
                }
                const { body } = await response.json();
                setUserId(userId),
                setAmount(amount),
                setOrderStatus(orderStatus),
                setShippingAddress(shippingAddress),
                setPaymentMethod(paymentMethod),
                setPaymentStatus(paymentStatus)
        }catch (error){
            console.error("error fetching details",error)
        }
    }
    return (
        <div>
            <div className="text-white font-bold 4xl my-3 ml-4 bg-blue">
                Make Orders
            </div>
        <input className="text-black ml-5 border-black rounded my-4 pl-2"
               type="text"
               placeholder="Enter  userId"
               onChange={(e)=>setUserId(e.target.value)}
               value={userId}
        ></input>
        <input className="text-black ml-5 border-black rounded my-4 pl-2"
               type="number"
               placeholder="Enter Amount required"
               onChange={(e)=>setAmount(e.target.value)}
               value={amount}
        ></input>
        <input className="text-black ml-5 border-black rounded my-4 pl-2"
               type='text'
               placeholder="Order Status "
               onChange={(e)=>setOrderStatus(e.target.value)}
               value={orderStatus}
        ></input>
        <input className="text-black ml-5 border-black rounded my-4 pl-2"
               type='text'
               placeholder="Enter Payment Method"
               onChange={(e)=>setPaymentMethod(e.target.value)}
               value={paymentMethod}
        ></input>
        <input className="text-black ml-5 border-black rounded my-4 pl-2"
               type='text'
               placeholder="Payment Status"
               onChange={(e)=>setPaymentStatus(e.target.value)}
               value={paymentStatus}
        ></input>
            <input className="text-black ml-5 border-black rounded my-4 pl-2"
                   type="text"
                   placeholder="Shipping address"
                   onChange={(e)=>setShippingAddress(e.target.value)}
                   value={shippingAddress}
            ></input>
        <div>
            <button
                className="bg-white text-black ml-5 border-black rounded my-4 px-2"
                onClick={makeOrder}
            >
                Add to Order
            </button>
        </div>
        
    </div>
 )
 
}

	
