"use client"
import { useState } from "react"

export default function makeCategory() {
    const [name,setName]=useState()
    const [discription,setDiscription]=useState()
    async function addCategory() {
        try{
            const response = await fetch('/api/category',{
                method: 'POST',
                body: JSON.stringify({
                    name,
                     discription,             
                })
            });
                if(!response.ok){
                    throw new Error("network response was not okay");
                }
                const { body } = await response.json();
                setName(name),
                setDiscription(discription)
        }catch (error){
            console.error("error fetching details",error)
        }
    }
    return (
        <div>
            <div className="text-white font-bold 4xl my-3 ml-4 bg-blue">
                Add New Category
            </div>
        <input className="text-black ml-5 border-black rounded my-4 pl-2"
               type="text"
               placeholder="enter category name"
               onChange={(e)=>setName(e.target.value)}
               value={name}
        ></input>
            <input className="text-black ml-5 border-black rounded my-4 pl-2"
                   type="text"
                   placeholder="Discription"
                   onChange={(e)=>setDiscription(e.target.value)}
                   value={discription}
            ></input>
        <div>
            <button
                className="bg-white text-black ml-5 border-black rounded my-4 px-2"
                onClick={addCategory}
            >
                submit Category
            </button>
        </div>
        
    </div>
 )
}

	
