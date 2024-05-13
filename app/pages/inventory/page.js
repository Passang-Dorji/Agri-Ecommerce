"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
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

  async function searchProducts() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/inventory/search?search=${search}`
      );
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      const { data } = await response.json();
      setProducts(data);
      setSearch("");
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
      setProducts([])
    }catch(error){
      console.error("Update failed",error)
    }
  }
  return (
    <div className="flex relative">
      <div className="w-1/2 mx-4 ">
        <p className="font-bold text-2xl ml-2 mt-2">Inventory List</p>
        {inventory.map((intven) => {
          return (
            <div
              className="ml-4 mt-4 border-2 border-white rounded-lg px-4 py-2"
              key={intven.id}
            >
              <p>Product name: {intven.product_name}</p>
              <p>Product price: {intven.price}</p>
              <p>Quantity: {intven.quantity}</p>
              <button className="border-2 border-white"
                onClick={()=> {
                  setState(!state)
                  setId(intven.id)
                }}
              >Stock Update
              </button>
            </div>
          );
        })}
      </div>
      <div className="w-1/2 bg-white mx-4 mt-4">
        <input
          className="rounded-lg ml-4 my-4 border-2 border-black text-black px-2"
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="border-2 border-black rounded-lg text-black px-2 ml-2"
          onClick={searchProducts}
        >
          Search
        </button>
        {products.map((product) => {
          return (
            <div className="text-black ml-2 mt-4 font-bold bg-transparent/30" key={product.id}>
              <p>Product name: {product.product_name}</p>
              <p>Product price: {product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <button className="border-2 border-black px-2"
                onClick={()=> {
                  setState(!state)
                  setId(product.id)
                }}
              > Stock Update
              </button>
            </div>
          )
        })}
      </div>
      <div className= {`${state? "static" :"hidden"} bg-emerald-400	 text-black absolute top-1/3 left-1/3 border-2 border-black rounded-lg h-1/2 w-1/3 px-4 py-2`}
      >
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
