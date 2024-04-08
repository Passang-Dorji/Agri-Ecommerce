"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home({ params }){
    const [categories,setCategories] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getCategory(){
            const categoryId = params.id
            const res = await fetch(`http://localhost:3000/api/category/${categoryId}`)
            const { data } = await res.json();
            setCategories(data)
            console.log(data)
        }
        getCategory()
    }, [])
    return (
        <div>
            {categories.map((category) => (
                <div className="border-2 rounded  w-1/2 h-full mx-4 mt-4"key={category.id}> 
                    <p className="text-bold mx-4 my-4 "> Product Name : {category.product_name}</p>
                    <p className="text-bold mx-4 my-4 "> Category Name :{category.category_name}</p>
                    <p className="text-bold mx-4 my-4 "> Product Price : Nu.{category.price}/Kg</p>
                    <p className="text-bold mx-4 my-4 "> Product Description : {category.product_discription}</p>
                    <img 
                        src={category.other_details}
                        className="h-full w-full rounded-full"

                    />
                        <div className="flex justify-end">
                                <button className="text-white ml-4 border-2 rounded-full px-4 "
                                    onClick= {()=>router.push('/pages/makeorder')}
                                > order</button>
                        </div>
                </div>
            ))}
        </div>
    )
}

