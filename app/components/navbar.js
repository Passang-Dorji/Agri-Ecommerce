"use client"
import React from "react"
import 'flowbite'
import { UserContext } from "../state/user-context"
import { useContext,useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const { user }  = useContext(UserContext)
  const router = useRouter()
  const [name,setName] = useState()
  console.log(user)
  // const user = { name:"karma"}
  return (
    <div className="bg-orange-300	">

      <nav className=" bg-transparent/50 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://marketplace.canva.com/EAE04Hc76xE/1/0/1600w/canva-green-floral-agriculture-organic-wheat-farm-logo-design-EopC-HgEgK8.jpg" 
              className="h-10 w-10 rounded-full" alt="Agri-Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Agri@.{user.name}</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-transparent dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
          <div className="bg-orange-300 w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent md:bg-transparent/50">
              <div>
               <input className="text-black pl-4 rounded-full h-10 w-80"
                  type="text"
                  placeholder="Search"
                  onChange={(e)=> setName(e.target.value)}
                  value={name}
               />
              <button className="relative left-[-30px] top-[6px] py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                onClick={()=>router.push(`/pages/customers/${name}`)}
              > 
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
               </svg>
              </button>
              </div>

              <li>
                <Link href="/pages/allcategories" 
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
              </li>
              <li>
                <Link href="http://localhost:3000/pages/category/6" 
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Legumes and Pulses
                </Link>
              </li>
              <li>
                <Link href="http://localhost:3000/pages/category/7"
                 className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Fruits</Link>
              </li>
              <li>
                <Link href="http://localhost:3000/pages/category/3
                " className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Vegetables</Link>
              </li>
              <li>
                <Link href="http://localhost:3000/pages/category/4" 
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Grain</Link>
              </li>
              <li>
                <Link href="http://localhost:3000/pages/category/5" 
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">OilSeeds</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar
