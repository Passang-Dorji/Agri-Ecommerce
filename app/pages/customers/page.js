"use client"
import { useState } from "react"

export default function Home() {
	const [name, setName] = useState([])
    const [products,setProducts]=useState([])
    async function getDetails() {
        try{
            const response = await fetch(`/api/products/search?p_name=${name}`);
                if(!response.ok){
                    throw new Error("network response was not okay");
                }
                const { data } = await response.json();
                setProducts(data)
                console.log(data)
        }catch (error){
            console.error("error fetching details",error)
        }
    }
    return (
        <div>
            <input className="text-black ml-5"
                   type="text"
                   placeholder="enter product name"
                   onChange={(e)=>setName(e.target.value)}
                   value={name}
            ></input>
            <button
                className="text-white"
                onClick={getDetails}
            >
                search
            </button>
            <div className="text-white mt-7 ml-4 ">
               {products.map((product) => {
                    return (
                        <div className=" mt-6 border-2 rounded-lg px-3 py-3 w-2/3"key={product.id}>
                            <p className="font-bold ">{product.product_name}</p> 
                            <p className="font-bold">Discription:{product.discription}</p>
                            <p className="font-bold ">PRICE: {product.product_price}</p>
                            <p className="font-bold ">QUANTITY:{product.quantity}</p>
                            <p className="font-bold ">Seller Name:{product.seller_name}</p>
                            <p className="font-bold ">Seller Address:{product.seller_address}</p>
                        </div>
                    )
               })}
            </div>
        </div>
    )
}
	
