"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
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
  return (
    <div className="flex ">
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
            <div className="text-black ml-2 mt-4 font-bold" key={product.id}>
              <p>Product name: {product.product_name}</p>
              <p>Product price: {product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
