"use client"
import { UserContext } from "@/app/state/user-context"
import { useContext, useEffect, useState } from "react"

export default function getProducts({params}){
    const [products,setProducts] = useState([])
    const {orderItems,setOrderItems,user} = useContext(UserContext)
      function addProductToCart(formEvent,product){
        formEvent.preventDefault()
        const formData = new FormData(formEvent.currentTarget)
        setOrderItems([...orderItems, {
            product_id:product.id,
            quantity:formData.get('quantity'),
            name:product.product_name,
        }])
      }
       async function submitOrder(formEvent){
            formEvent.preventDefault()
           const formData = new FormData(formEvent.currentTarget)
           const body = {
            "user_id":user ? user.id : null,
            "status":"pending",
            "address":formData.get("address"),
            "payment":formData.get("payment"),
            "order_itesms":orderItems
           }
           const res = await fetch(`http://localhost:3000/api/orders`,{
                method:'POST',
                body:JSON.stringify(body)
           })
       }
       useEffect(() =>{
           async function getPdtDetails(){
            const productName = params.name
               const response = await fetch(`/api/products/search?p_name=${productName}`)
               const { data } = await response.json()
               setProducts(data)
           }
           getPdtDetails()
       },[])
    return(
        <div className="mt-4 ml-4 "        >
              <div className="flex mt-4"
                  style = {{backgroundImage:"url('https://marketplace.canva.com/EAE04Hc76xE/1/0/1600w/canva-green-floral-agriculture-organic-wheat-farm-logo-design-EopC-HgEgK8.jpg')",
                  backgroundSize: 'screen',backgroundPosition: 'center'}}
              >
                <div className=" min-h-screen w-2/3 text-white text-bold mx-2 ">
                  {products.map((product)=>{
                    return(
                        <div className="text-bold text-white border-2 mt-4 py-2 rounded-2xl bg-transparent/50" key={product.id}>
                            <p className="font-bold text-white ml-4 ">Product Name : {product.product_name}</p>
                            <p className="font-bold text-white ml-4 ">Price : {product.product_price}</p>
                            <p className="font-bold text-white ml-4 ">Quantity Avialable : {product.quantity} Kg</p>
                            <p className="font-bold text-white ml-4 ">Dealer Name : {product.seller_name}</p>
                            <p className="font-bold text-white ml-4 ">Address : {product.seller_address}</p>
                            <p className="font-bold text-white ml-4 ">Description : {product.discription}</p>
                                <form className="flex justify-end" onSubmit={(formEvent)=> addProductToCart(formEvent,product)}>
                                    <input className="text-black mx-2 rounded-2xl pl-4 w-24" 
                                        type="number"
                                        name="quantity" 
                                        placeholder="Quantity"
                                    ></input>
                                     <button className="border-2 rounded-full px-2 mr-2" type="submit">
                                        order
                                     </button>
                                </form>
                        </div>
                    )
                })}
                 </div>
                    <div className=" bg-transparent/50 mx-2 w-1/3 text-white border-2 border-white rounded-2xl overflow-hidden mt-4 backdrop-opacity-15 backdrop-invert bg-slate-400">
                        <h1 className=" w-full bg-transparent/30 font-bold text-2xl pt-4 pb-2 pl-4"> Customer Cart</h1>
                        {orderItems.map(orderItem => (
                            <p className="my-4 mx-2">{orderItem.quantity} X {orderItem.name}</p>
                        ))}
                        <form className="my-4 mx-2"onSubmit={submitOrder}>
                            <p className="font-bold">Address</p>
                            <input className="text-black pl-2 rounded-2xl pl-4" type="text" name="address" />
                            <p className="font-bold">Payment</p>
                            <input className="text-black pl-2 rounded-2xl pl-4" type="text" name="payment" />
                            <button
                                className="text-white ml-4 border-2 rounded-full px-4 "
                                type="submit"
                            >
                                Submit Order
                            </button>
                        </form>
                    </div>
              </div>
        </div>
    )
}
	
