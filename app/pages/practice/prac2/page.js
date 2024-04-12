
"use client"
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"

export default function searchProducts({params}) {
    const router = useRouter()
    const [products,setProducts]=useState([])
    useEffect(()=>{
        async function getDetails() {
            const productName = params.name
            
                const response = await fetch(`http://localhost:3000/api/products/search?p_name=${productName}`);
                    const { data } = await response.json();
                    setProducts(data)
                    console.log(data)
        }
        getDetails()
    },[])
    return (
        <div>
            <div className="text-white mt-7 ml-4 ">
               {products.map((product) => {
                    return (
                        <div className=" mt-6 border-2 rounded-lg px-3 py-3 w-2/3"key={product.id}>
                            <p className="font-bold ">{product.product_name}</p> 
                            <p className="font-bold">Discription : {product.discription}</p>
                            <p className="font-bold ">PRICE : Nu {product.product_price}/- per kg</p>
                            <p className="font-bold ">QUANTITY : {product.quantity} KG avialable</p>
                            <p className="font-bold ">Seller Name : {product.seller_name}</p>
                            <p className="font-bold ">Seller Address : {product.seller_address}</p>
                            <div className="flex justify-end">
                            <button className="text-white ml-4 border-2 rounded-full px-4 "
                                onClick= {()=>router.push('/pages/makeorder')}
                            > order</button>
                            </div>
                        </div>
                    )
               })}
            </div>
        </div>
    )
}