"use client"

import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/app/state/user-context"

export default function Home({ params }){
    const [products, setProducts] = useState([])
    const { orderItems,setOrderItems, user } = useContext(UserContext)

    function addProductToCart(formEvent, product) {
        formEvent.preventDefault()

        console.log(product)

        const formData = new FormData(formEvent.currentTarget)

        setOrderItems([...orderItems, {
            product_id: product.id,
            quantity: formData.get('quantity'),
            name: product.product_name,
        }])
        
    }

    async function submitOrder(formEvent) {
        formEvent.preventDefault()

        const formData = new FormData(formEvent.currentTarget)
        const body = {
            "user_id": user ? user.id : null,
            "status": "pending",
            "address": formData.get("address"),
            "payment": formData.get("payment"),
            "order_items": orderItems
        }
        console.log(body)
        const res = await fetch(`http://localhost:3000/api/orders`, {
            method: `POST`,
            body: JSON.stringify(body)
        })
    }

    useEffect(() => {
        async function getProducts(){
            const categoryId = params.id
            const res = await fetch(`http://localhost:3000/api/category/${categoryId}`)
            const { data } = await res.json();
            setProducts(data)
        }
        getProducts()
    }, [])
    return (
        <div className="flex bg-transparent h-full"
            style = {{backgroundImage:"url('https://marketplace.canva.com/EAE04Hc76xE/1/0/1600w/canva-green-floral-agriculture-organic-wheat-farm-logo-design-EopC-HgEgK8.jpg')",
            backgroundSize: 'cover',backgroundPosition: 'center'}}
        >
            <div className="w-2/3 mr-4 mx-4 mt-4 rounded-2xl">
                {products.map((product) => (
                    <div className=" backdrop-opacity-15 backdrop-invert bg-transparent/50 border-2 rounded-2xl mb-4"key={product.id}> 
                        <p className="font-bold mx-4 my-4 "> Product Name : {product.product_name}</p>
                        <p className="font-bold mx-4 my-4 "> Category Name :{product.category_name}</p>
                        <p className="font-bold mx-4 my-4 "> Product Price : Nu.{product.price}/Kg</p>
                        <p className="font-bold mx-4 my-4 "> Product Description : {product.product_discription}</p>
                            <img 
                                src={product.other_details}
                                className="h-1/2 w-1/2 rounded-lg px-4"
                            />
                            <form className="flex justify-end" onSubmit={(formEvent) => addProductToCart(formEvent, product)}>
                                <input className="text-black w-20 mb-2 rounded-2xl pl-2" type="number" name="quantity" />
                                <button
                                    className="text-white ml-4 border-2 rounded-full px-4 mb-2 mr-2"
                                    type="submit"
                                >
                                    order
                                </button>
                            </form>
                    </div>
                ))}
            </div>
            <div className="w-1/3">
                <div className="text-white border-2 border-white rounded-2xl overflow-hidden mt-4 backdrop-opacity-15 backdrop-invert bg-transparent/50">
                    <h1 className=" font-bold text-white pl-4 py-4 w-full bg-transparent/30 text-2xl"> Customer Cart</h1>
                    {orderItems.map(orderItem => (
                        <p className="my-4 mx-2">{orderItem.quantity} X {orderItem.name}</p>
                    ))}
                    <form className="my-4 mx-2"onSubmit={submitOrder}>
                        <p>Address</p>
                        <input className="text-black rounded-2xl" type="text" name="address" />
                        <p>Payment</p>
                        <input className="text-black rounded-2xl" type="text" name="payment" />
                        <button
                            className="text-white ml-4 border-2 rounded-full px-4 sm:mt-4"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

