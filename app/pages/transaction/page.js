"use client"
import { useRef, useState } from "react"

export default function Home(){
    const formElement = useRef(null)
    const [products,setProducts] = useState([])
    const [search,setSearch] = useState()
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
            setError(error.message)
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
                                <p>Product Name : {product.product_name}</p>
                                <p> Price : {product.price}</p>
                                <form onSubmit={(formEvent)=> addProductsToCard(formEvent,product)}
                                      ref={formElement}
                                >
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
                    <table className="border-2 border-black mt-4 mx-6 w-2/3"> 
                        <tbody>
                            <tr className="border-2 border-black">
                                    <th className="border-2 border-black"> Product Name </th>
                                    <th className="border-2 border-black"> Price </th>
                                    <th className="border-2 border-black"> Quantity </th>
                                    <th className="border-2 border-black"> Total Price </th>
                            </tr>
                        {itemLists?.map(itemlist =>(
                            <tr key={itemlist.productId} className="border-2 border-black ">
                                    <td className="border-2 border-black pl-2 ">  {itemlist.name} </td>
                                    <td className="border-2 border-black pl-2 "> {itemlist.price} </td>
                                    <td className="border-2 border-black pl-2 "> 
                                        <input className="px-2 w-24"
                                               type="number"
                                               value={itemlist.quantity}
                                               onChange={(e)=>updateQuantity(itemlist.productId,parseInt(e.target.value))}
                                        />
                                      </td>
                                    <td className="border-2 border-black pl-2 "> {itemlist.quantity * itemlist.price} </td>   
                            </tr>
                        ))}
                        </tbody>
                </table>
                <form onReset={(e)=>setItemLists([])}
                    className="mx-6 my-2"
                    onSubmit={submitItems} 
                    ref={formElement}
                >
                    <p className="ml-6">  Total Amt: {totalAmount} </p>
                    <p> Payment Method</p>
                    <input className="text-black rounded-lg px-3"
                        type="text" 
                        placeholder="Payment Method"
                        name="payment"
                        />
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
                    <button className="border-2 border-black rounded-lg ml-2 px-2"
                        type="reset"
                    >Cancle
                    </button> 
                    <p className="text-red-500 mt-4">{error}</p>
                </form>
            </div>

        </div>
    )
}