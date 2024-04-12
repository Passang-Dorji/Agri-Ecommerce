"use client"
import { useState } from "react"

export default function getProducts(){
    const [name,setName] = useState()
    const [products,setProducts] = useState([])
    const [orderItems,setOrderItems] = useState([])
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
            "user_id":1,
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
        async function getPdtDetails(){
            const response = await fetch(`/api/products/search?p_name=${name}`)
            const { data } = await response.json()
            setProducts(data)
            setName("")
        }
    return(
        <div className="mt-4 ml-4 ">
            <div>
                <input className="text-bold text-black rounded-full pl-2"
                    type="text"
                    placeholder="Search Products"
                    onChange={(e)=> setName(e.target.value)}
                    value={name}
                >
                </input>
                    <button className="text-white border-2 rounded-full ml-4 px-2"
                        onClick={getPdtDetails}
                    > search
                    </button>
            </div>
              <div className="flex mt-4">
                <div className="w-2/3 text-white text-bold">
                  {products.map((product)=>{
                    return(
                        <div className="text-bold text-white border-2 mt-4 py-2 rounded" key={product.id}>
                            <p className="text-bold text-white ml-4 ">Product Name : {product.product_name}</p>
                            <p className="text-bold text-white ml-4 ">Price : {product.product_price}</p>
                            <p className="text-bold text-white ml-4 ">Quantity Avialable : {product.quantity}/Kg</p>
                            <p className="text-bold text-white ml-4 ">Dealer Name : {product.seller_name}</p>
                            <p className="text-bold text-white ml-4 ">Address : {product.seller_address}</p>
                            <p className="text-bold text-white ml-4 ">Dscription : {product.discription}</p>
                                <form className="flex justify-end" onSubmit={(formEvent)=> addProductToCart(formEvent,product)}>
                                    <input className="text-black" type="number"name="quantity" ></input>
                                     <button className="border-2 rounded-full px-2 mr-2" type="submit">
                                        order
                                     </button>
                                </form>
                        </div>
                    )
                })}
                 </div>
                 <div className="w-1/3 border-white border-2 mx-2 rounded-lg px-2 py-2">
                    <div className="text-white border-2 border-white rounded-2xl overflow-hidden mt-4 backdrop-opacity-15 backdrop-invert bg-slate-400">
                        {orderItems.map(orderItem => (
                            <p className="my-4 mx-2">{orderItem.quantity} X {orderItem.name}</p>
                        ))}
                        <form className="my-4 mx-2"onSubmit={submitOrder}>
                            <p>Address</p>
                            <input className="text-black" type="text" name="address" />
                            <p>Payment</p>
                            <input className="text-black" type="text" name="payment" />
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
        </div>
    )
}