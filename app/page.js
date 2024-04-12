"use client"
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "./state/user-context";

export default function customerlogin() {
  const [name,setName] = useState()
  const [ password,setPassword] = useState()
  const [ error,setError] = useState()
  const { user, setUser } = useContext(UserContext)
  const router= useRouter()

  const handleLogin = async () => {
    console.log("HERE!")
    
    try{
          const response = await fetch('/api/login',{
            method: 'POST',
            body: JSON.stringify({
              userName:name,
              password:password
            })
          })
          if(!response.ok){
            throw new Error("Network Response not okay.login failed")
          }
          const { data: user } = await response.json();
          setUser(user)
          console.log (user)
           router.push('/pages/allcategories')
        }catch (error){
            setError("Invalid Username or Password")
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen"
      style = {{backgroundImage:"url('https://marketplace.canva.com/EAE04Hc76xE/1/0/1600w/canva-green-floral-agriculture-organic-wheat-farm-logo-design-EopC-HgEgK8.jpg')",
      backgroundSize: 'screen',backgroundPosition: 'center'}}
    >
      <button className="text-black my-4 text-2xl border-2 border-black font-bold px-2 w-40 rounded-full h-12"
          onClick={() => router.push('/pages/orderlist')}
      >Seller
      </button>
        <div className="bg-transparent/30 shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 w-1/3">
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 " htmlFor="username">
                Username
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLogin}
            >
               Login
            </button>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    </div>
</div>
);
};
