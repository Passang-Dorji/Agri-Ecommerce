"use client"
import React from "react"
import { useRef, useState } from "react"
import SearchBar from "@/app/components/searchbar"
import Table from "@/app/components/table"

export default function TransactionPage(){
    const formElement = useRef(null)
    const [products,setProducts] = useState([])
    const [itemLists,setItemLists] = useState([])
    const [error, setError] = useState("")
    
    var totalAmount = itemLists.reduce((acc,current)=>{
        return acc + (current.quantity * current.price)
    },0) 
    function addProductsToCard(formEvent,product){
        formEvent.preventDefault()
        const formData = new FormData(formEvent.currentTarget)
        // console.log(itemLists)
        // console.log(product.id)
        const quantityToAdd = Math.abs(parseInt(formData.get('quantity')))
        if(itemLists.some(pdt=>pdt.productId === product.id)){
            const foundPdtIndex = itemLists.findIndex(pdt => pdt.productId === product.id)
            itemLists[foundPdtIndex].quantity +=   quantityToAdd
            setItemLists([...itemLists])
        }else{
            setItemLists([...itemLists,{
                productId:product.id,
                name:product.product_name,
                quantity:quantityToAdd,
                price:product.price,
            }])
        }   
        formElement.current?.reset()
    }
    function deletePdtFromCart(pdtId){
        const indexToDelete = itemLists.findIndex(item => item.productId ===pdtId )
        itemLists.splice(indexToDelete,1)
        setItemLists([...itemLists])
    }
    const updateQuantity = (itemId, newQuantity)=>{
        setItemLists(itemLists.map(item => {
            if (item.productId === itemId) {
                return {
                    ...item,
                    quantity: newQuantity
                };
            }
            return item
        }))
    }
    async function submitItems(formEvent){
        try{
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
            console.log(response)
            if(!response.ok){
                const errorMessage = await response.text()
                throw new Error(errorMessage)
            }
            formElement.current?.reset()
            setItemLists([])
        }catch(error){
            setError(error.message)
        }
    }    
    async function getProduct(search){
        try{
            const response = await fetch(`http://localhost:3000/api/inventory/search?search=${search}`)
            if (!response.ok){
                throw new Error("Network response was not okay")
            }
            const {data} = await response.json()
            setProducts(data)
        }catch(error){
            setError(error.message)
        }
    }
    return(
        <div className="mt-24 ml-4 flex">
            <div className="w-1/2 mx-3 mt-8 rounded-2xl text-black font-bold border-2 border-black bg-transparent/10 h-4/5">
                <div className="h-96">
                    <table className=" w-full mt-2 border-b-2 ">
                            <thead>
                                <tr className="border-b-2 border-black">
                                        <th className=" "> Product Name </th>
                                        <th className=""> Price </th>
                                        <th className=""> Quantity </th>
                                        <th className=""> Total Price </th>
                                </tr>
                            </thead> 
                            <tbody className="">
                            {itemLists?.map(itemlist =>(
                                <tr key={itemlist.productId} className="">
                                        <td className="text-center py-1 ">  {itemlist.name} </td>
                                        <td className="text-center py-1 "> {itemlist.price} </td>
                                        <td className="text-center py-1"> 
                                            <input className="pl-6 w-16"
                                                type="number"
                                                min={1}
                                                value={itemlist.quantity}
                                                onChange={(e)=>updateQuantity(itemlist.productId,parseInt(e.target.value))}
                                            />
                                        </td>
                                        <td className="pr-12 py-1 text-right"> {itemlist.quantity * itemlist.price} </td> 
                                        <td>
                                            <button className=" ml-2 px-2"
                                                    onClick={()=>deletePdtFromCart(itemlist.productId)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </td>  
                                </tr>
                            ))}
                            </tbody>
                    </table>
                </div>
                <form onReset={(e)=>setItemLists([])}
                    className="mx-6 my-2"
                    onSubmit={submitItems} 
                    ref={formElement}
                >
                    <p className="flex justify-end pr-[85px] border-b-2 border-black ">  Total Amt : {totalAmount} </p>
                    <div className="flex justify-between mt-6">
                        <div className="space-y-2">
                            <p> Payment Method </p>
                            <input className="text-black rounded-lg h-8 pl-2"
                                type="text" 
                                placeholder="Payment Method"
                                name="payment"
                                />
                        </div>
                        <div className="space-y-2">
                            <p> Journal Number </p>
                            <input className="text-black rounded-lg h-8 pl-2"
                                type="text" 
                                placeholder="Journal No."
                                name="journal Number"/> 
                        </div>
                    </div>
                        <p className="text-red-500 mt-4">{error}</p>
                    <div className="flex justify-between">
                        <button className="border border-black rounded-lg px-2 bg-[#44ca72]"
                        type="submit"
                        >
                            Submit
                        </button>  
                        <button className="border-2 border-black rounded-lg px-2"
                            type="reset"
                        >Cancle
                        </button> 
                    </div>
                </form>
            </div>
            <div className="w-1/2 mx-3">
                <div className="mx-2">
                    <SearchBar onSearch={getProduct} />
                </div>
                <Table
                    data={products}
                    headers={["ID","Product Name","Price","Quantity"]}
                    renderRow={(product, index) => (
                        <React.Fragment key={product.id}>
                                <td className="px-2 text-center">{product.id}</td>
                                <td className=" mx-6 text-center ">{product.product_name}</td>
                                <td className=" mx-6 text-center ">{product.price}</td>
                                <td className=" mx-6 text-center ">
                                    <form onSubmit={(formEvent)=> addProductsToCard(formEvent,product)}
                                        ref={formElement}
                                        >
                                        <input className="pl-2 mb-2 w-24 h-10 rounded-lg text-black relative ml-16 mt-2"
                                            type="number"
                                            name="quantity"
                                            placeholder="Quantity"   
                                        />
                                        <button className="border-2 border-white px-2 rounded-lg relative ml-4" 
                                        type="submit">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </form>
                                </td>
                        </React.Fragment>
                      )}
                />
            </div>
        </div>
    )
}