"use client"
import { useState } from "react"

export default function Home() {
    const [name,setName]=useState()
    const [price,setPrice]=useState()
    const [quantity,setQuantiy]=useState()
    const [discription,setDiscription]=useState()
    const [categoryId,setCategoryId]=useState()
    const [sellerId,setsellerId]=useState()
    const [otherDetails,setotherDetails]=useState()
    async function addProducts() {
        try{
            const response = await fetch('/api/products',{
                method: 'POST',
                body: JSON.stringify({
                    name,
                    price,
                    quantity,
                    discription,
                    categoryId,
                    sellerId,
                    otherDetails             
                })
            });
                if(!response.ok){
                    throw new Error("network response was not okay");
                }
                const { body } = await response.json();
                setName(name),
                setPrice(price),
                setQuantiy(quantity),
                setDiscription(discription),
                setCategoryId(categoryId),
                setsellerId(sellerId),
                setotherDetails(otherDetails)
        }catch (error){
            console.error("error fetching details",error)
        }
    }
    return (
        <div className="min-h-screen"
        style = {{backgroundImage:"url('https://marketplace.canva.com/EAE04Hc76xE/1/0/1600w/canva-green-floral-agriculture-organic-wheat-farm-logo-design-EopC-HgEgK8.jpg')",
        backgroundSize: 'screen',backgroundPosition: 'center'}}
        >
            <div className="text-black text-2xl font-bold my-3 ml-4" >
                Add Products For Sale
            </div>
        <input className="text-black ml-5 border-black rounded-full my-4 px-4 border-2 border-black py-2"
               type="text"
               placeholder="enter product name"
               onChange={(e)=>setName(e.target.value)}
               value={name}
               ></input>
        <input className="text-black ml-5 border-black rounded-full my-4 px-4 border-2 border-black py-2"
               type="number"
               placeholder="Enter Price /Kg"
               onChange={(e)=>setPrice(e.target.value)}
               value={price}
               ></input>
        <input className="text-black ml-5 border-black rounded-full my-4 px-4 border-2 border-black py-2"
               type='number'
               placeholder="Enter Quantity"
               onChange={(e)=>setQuantiy(e.target.value)}
               value={quantity}
               ></input>
        <input className="text-black ml-5 border-black rounded-full my-4 px-4 border-2 border-black py-2"
               type='number'
               placeholder="Enter Category ID"
               onChange={(e)=>setCategoryId(e.target.value)}
               value={categoryId}
               ></input>
        <input className="text-black ml-5 border-black rounded-full my-4 px-4 border-2 border-black py-2"
               type='number'
               placeholder="Seller ID"
               onChange={(e)=>setsellerId(e.target.value)}
               value={sellerId}
               ></input>
        <input className="text-black ml-5 border-black rounded-full my-4 px-4 border-2 border-black py-2"
               type="text"
               placeholder="Other Details"
               onChange={(e)=>setotherDetails(e.target.value)}
               value={otherDetails}
               ></input>
            <input className="text-black ml-5 border-black rounded-full my-4 px-4 border-2 border-black py-2"
                   type="text"
                   placeholder="Description"
                   onChange={(e)=>setDiscription(e.target.value)}
                   value={discription}
                   ></input>
        <div>
            <button
                className="text-white font-bold ml-5 rounded-full my-4 px-4 border-2 border-black py-2 bg-transparent/50"
                onClick={addProducts}
                >
                submit products
            </button>
        </div>
        
    </div>
 )
}

	
