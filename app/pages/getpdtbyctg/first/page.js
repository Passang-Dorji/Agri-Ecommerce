"use client"
import { useState } from "react"

export default function Home() {
    const [category,setCategory]=useState([])
    async function getpdtbyctg() {
        try{
            const response = await fetch('/api/getpdtbyctgid');
                if(!response.ok){
                    throw new Error("network response was not okay");
                }
                const { data } = await response.json();
                console.log(data)
                setCategory(data)
        }catch (error){
            console.error("error fetching details",error)
        }
    }
    return (
        <div>
            <button
                className="text-black px-4 mt-7 ml-4 border-3 rounded full bg-white"
                onClick={getpdtbyctg}
            >
                category list
            </button>
            <div className="text-white">
                {category.map((ctg) =>{
                    return(
                        <div className=" border-2 rounded-lg px-3 py-3 w-2/3 text-white mt-7 ml-4"key={ctg.id}>
                            <p>Product Name : {ctg.product_name}</p>
                            <p> Price : {ctg.price}</p>
                            <p>Product Description : {ctg.product_discription}</p>
                            <p> Category Name : {ctg.category_name}</p>
                            <p>Category Description : {ctg.category_discription}</p>
                        </div>
                    )
                })}
            </div>
         </div>
    )
}
	
