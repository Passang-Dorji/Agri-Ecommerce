"use client"
import { useState } from "react"

export default function transactionHis(){
    const [journalNo,setjournalNo] = useState()
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate] = useState()
    const [transactions,setTransactions] = useState([])

    async function getTransaction(){
        try{
            const response = await fetch(`http://localhost:3000/api/transactionHis/searchByJnrl?jnrl_no=${journalNo}`)
            if (!response.ok){
                throw new Error("network response was not okay")
            }
            const {data} = await response.json()
            console.log(data)
            setTransactions(data)
            setjournalNo("")
        }catch (error){
            console.error("failed fetching data",error)
        }
    }
    async function getTransByDate(){
        try{
            const response = await fetch(`http://localhost:3000/api/transactionHis?start_date=${startDate}&end_date=${endDate}`)
            if (!response.ok){
                throw new Error("network response was not okay")
            }
            const {data} =await response.json()
            setTransactions(data)
        }catch(error){
            console.error("failed",error)
        }
    }
   
    let prevTransactionId = null

    return(
        <div className="bg-teal-700	">
            <input className="mt-6 ml-4 pl-4 text-black rounded-lg"
                   type="text"
                   placeholder="enter Jnrl No"
                   value={journalNo}
                   onChange={(e)=> setjournalNo(e.target.value)}
            />
            <button className="border-2 border-white mx-4 px-2 rounded-lg"
                    onClick={getTransaction}
            >search
            </button>
            <input className="text-black mx-2 px-2"
                type="text"
                placeholder="Start date"
                value={startDate}
                onChange={(e)=>setStartDate(e.target.value)}
            />
            <input className="text-black mx-2 px-2"
                type="text"
                placeholder="End Date"
                value={endDate}
                onChange={(e)=>setEndDate(e.target.value)}
            />
            <button className="border-2 border-white rounded-lg px-2"
                onClick={getTransByDate}
            >search</button>
            <div>
                <p className="ml-4 mt-4 font-bold text-white"> Transactions </p>
                <div className="border-2 border-white mt-4 mx-2 w-1/2 bg-transparent/30 rounded-2xl">
                        {transactions.map((transaction,index) =>{
                            const isNewTransaction = transaction.id !== prevTransactionId ;
                            prevTransactionId =transaction.id           
                            return(
                            <div className="text-white my-4 ml-4" key={transaction.id}>
                                    {isNewTransaction &&(
                                        <>
                                        <p className="pl-2 ">Transaction ID : {transaction.id} </p>
                                        <p className="pl-2 "> Journal Number : {transaction.journal_number} </p>
                                        <p className="pl-2 font-bold"> Total Amount :{transaction.total_amount} </p>
                                        <p className="pl-2 "> Payment Method : {transaction.payment_method} </p>
                                        <p className="pl-2 "> Opened At :{transaction.opened_at} </p>
                                        <p className="pl-2 "> Closed At : {transaction.closed_at} </p>
                                        </>
                                    )}
                            </div>
                            )
                        })}
                                <table className=" my-4 ml-4">
                                    <tbody>
                                        <tr className="border-2 border-white">
                                            <th className="border-2 border-white px-2"> Product Name </th>
                                            <th className="border-2 border-white px-2"> Quantity </th>
                                            <th className="border-2 border-white px-2"> Price </th>
                                            <th className="border-2 border-white px-2"> Total Price </th>
                                        </tr>
                                        {transactions.map(transaction =>
                                        <tr key={transaction.id}>
                                            <td className="border-2 border-white pl-2"> {transaction.product_name} </td>
                                            <td className="border-2 border-white pl-2"> {transaction.quantity} </td>
                                            <td className="border-2 border-white pl-2"> {transaction.price} </td>
                                            <td className="border-2 border-white pl-2"> {transaction.total_price} </td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                </div>
            </div>
        </div>
    )
}