"use client"
import { useState } from "react"

export default function Home(){
    const [products,setProducts] = useState([])
    const [search,setSearch] = useState()
    const [itemLists,setItemLists] = useState([])

    var totalAmount = itemLists.reduce((acc,current)=>{
        return acc + (current.quantity * current.price)
    },0) 
        function addProductsToCard(formEvent,product){
            formEvent.preventDefault()
            const formData = new FormData(formEvent.currentTarget)
            setItemLists([...itemLists,{
                productId:product.id,
                name:product.product_name,
                quantity:formData.get('quantity'),
                price:product.price,
            }])
        }
        async function submitItems(formEvent){
            formEvent.preventDefault()
            const formData = new FormData(formEvent.currentTarget)
            const body = {
                "totalAmount": totalAmount,
                "paymentMethod":formData.get('payment'),
                "journalNumber":formData.get('journal Number'),
                "itemLists":itemLists
            }
            const response = await fetch(`http://localhost:3000/api/transaction`,{
                method:'POST',
                body: JSON.stringify(body)
            })
        }

    async function getProduct(){
        try{
            const response = await fetch(`http://localhost:3000/api/inventory/search?search=${search}`)
            if (!response.ok){
                throw new Error("Network response was not okay")
            }
            const {data} = await response.json()
            setProducts(data)
            setSearch("")
        }catch(error){
            console.error("error fetching details",error)
        }
    }

    return(
        <div className="mt-4 ml-4 flex">
            <div className="w-1/2 mx-3">
                <div className="mx-2">
                <input className="text-black mx-2 px-2 rounded-lg"
                    type="text"
                    placeholder="Enter code"
                    onChange={(e)=> setSearch(e.target.value)}
                    value={search}    
                />
                <button
                    onClick={getProduct}
                >search</button>
                </div>
                <div className="border-2 border-white mt-4 font-bold rounded-2xl">
                    <p className="text-white ml-4 mt-4">found products</p>
                    {products.map((product)=>{
                        return(
                            <div className="text-white ml-4 py-4 font-bold"
                            key={product.id}>
                                <p>Product ID:{product.id}</p>
                                <p>Product Name:{product.product_name}</p>
                                <p> Price : {product.price}</p>
                                <form onSubmit={(formEvent)=> addProductsToCard(formEvent,product)}>
                                    <input className="mx-2 mb-2 px-2 rounded-lg text-black"
                                        type="number"
                                        name="quantity"
                                        placeholder="Quantity"   
                                    />
                                    <button className="border-2 border-white px-2 rounded-lg" 
                                    type="submit">
                                        add
                                    </button>
                                </form>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-1/2 bg-blue-300 mx-3 mt-8 rounded-2xl text-black font-bold">
                {itemLists.map(itemlist =>(
                    <div className="flex">   
                        <p className="ml-6 mt-4"> Product Name : {itemlist.name} </p>
                        <p className="ml-6 mt-4"> Price : {itemlist.price} </p>
                        <p className="ml-6 mt-4"> Quantity : {itemlist.quantity} </p>
                        <p className="ml-6 mt-4">Total Price : {itemlist.quantity * itemlist.price} </p>   
                    </div>
                ))}
                <form className="mx-6 my-2"
                     onSubmit={submitItems}>
                    <p className="ml-6">  Total Amt: {totalAmount} </p>
                    <p> Payment Method</p>
                    <input className="text-black rounded-lg px-3"
                        type="text" 
                        placeholder="Payment Method"
                        name="payment"/>
                    <p> Journal Number</p>
                    <input className="text-black rounded-lg px-3"
                        type="text" 
                        placeholder="Journal No."
                        name="journal Number"/> 
                    <button className="border-2 border-black rounded-lg ml-2 px-2"
                    type="submit"
                    >
                        submit
                    </button>   
                </form>
            </div>

        </div>
    )
}