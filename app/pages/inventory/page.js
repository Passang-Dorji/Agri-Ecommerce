"use client";
import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "@/app/components/searchbar";
import Table from "@/app/components/table";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [state, setState]= useState(false)
  const [id, setId]= useState()

  async function inventoryList() {
    try {
      const response = await fetch("/api/inventory");
      if (!response.ok) {
        throw new Error("Network response was mot okay");
      }
      const { data } = await response.json();
      console.log(data);
      setInventory(data);
    } catch (error) {
      console.error("error fetching details", error);
    }
  }
  useEffect(() => {
    inventoryList();
  }, []);

  async function searchProducts(search) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/inventory/search?search=${search}`
      );
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      const { data } = await response.json();
      setInventory(data);
    } catch (error) {
      console.error("error fetching data", error);
    }
  }

  async function submitUpdate(formEvent){
    try{
    formEvent.preventDefault()
    const formData = new FormData(formEvent.currentTarget)
    const body = {
        "quantity":formData.get('quantity'),
        "description": formData.get('description')
    }
      const response = await fetch(`http://localhost:3000/api/stocks?pdt_id=${formData.get('productId')}`,{
        method: 'POST',
        body: JSON.stringify(body)
      })
      if (!response.ok){
        throw new Error("reaponse was not okay")
      }
      setState(false)
      inventoryList()
    }catch(error){
      console.error("Update failed",error)
    }
  }
  return (
    <div className="relative mt-24">
      <div className="w-2/3 h-12 ml-48 mt-20 flex">
        <SearchBar onSearch={searchProducts} />
      </div>
      <div className="w-2/3 ml-48 mt-10">
        <Table
           data={inventory}
           headers={["Product name", "Price", "Quantity", "Update"]}
           renderRow={(item, index) => (
            <React.Fragment key={item.id}>
              <td className="font-bold text-center h-11">{item.product_name}</td>
              <td className="mx-6 text-center">{item.price} /-</td>
              <td className="mx-6 text-center">{item.quantity}</td>
              <td className="mx-6 text-center">
                <button
                  className="mt-2"
                  onClick={() => {
                    setState(!state);
                    setId(item.id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                   </svg>
                </button>
              </td>
            </React.Fragment>
          )}
      />
      </div>
      <div className= {`${state? "static" :"hidden"} bg-emerald-400	 text-black absolute top-1/3 left-1/3 border-2 border-black rounded-lg h-1/2 w-1/3 px-4 py-2`} >
        <form onSubmit={submitUpdate}>
          <input name="productId" value={id} className="hidden"/>
          <p> Quantity </p>
          <input className="text-black pl-2"
            placeholder="Quantity"
            type="number"
            name="quantity"
          />
          <p> Description </p>
          <input className="text-black pl-2"
            placeholder="Description"
            type="text"
            name="description"
          />
          <button className="border-2 border-black rounded-2xl px-2 hover:bg-slate-600"
          type="submit"
          > Update 
          </button>
          </form> 
      </div>
    </div>
  );
}
