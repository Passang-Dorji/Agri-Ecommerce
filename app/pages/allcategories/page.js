"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Home() {
    const router = useRouter()
    const [category,setCategory]=useState([])
    useEffect(() => {

        async function getCategory() {
            try{
                const response = await fetch('/api/category');
                    if(!response.ok){
                        throw new Error("network response was not okay");
                    }
                    const { data } = await response.json();
                    setCategory(data)
                    console.log(data)
            }catch (error){
                console.error("error fetching details",error)
            }
        }
        getCategory()
    },[])
    return (
        <div className="w-full h-screen"
        style = {{backgroundImage:"url('https://marketplace.canva.com/EAE04Hc76xE/1/0/1600w/canva-green-floral-agriculture-organic-wheat-farm-logo-design-EopC-HgEgK8.jpg')",
        backgroundSize: 'cover',backgroundPosition: 'center'}}
        >
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mx-4 pt-4"> Categories of Agri- Products</h2>
            <div className="mt-6 overflow-x-auto flex h-2/3 w-full ">
                {category.map((ctg) => (
                    <div className="mt-6 border-2 mx-2 px-2 hover:bg-transparent/30" key={ctg.id} style={{ minWidth: "400px" }}>
                        <div className="h-full w-full">
                            <p className="font-bold text-black my-3">Category Name: {ctg.name}</p>
                            <p className="font-bold text-black mb-6 h-24 overflow-y-scroll">Description: {ctg.discription}</p>
                            <Link href={`/pages/category/${ctg.id}`}>
                            <div className="bg-gray-200 h-3/5 w-full bg-center rounded-full">
                                <img
                                    src={ctg.imageSrc}
                                    alt={ctg.imageAlt}
                                    className="h-full w-full rounded-full"
                                />
                            </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
 }    
	
