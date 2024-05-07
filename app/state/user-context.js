"use client"

import { createContext, useState } from "react"

export const UserContext = createContext({})


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [orderItems, setOrderItems] = useState([])
    return (
        <UserContext.Provider value={{ 
            user: user, 
            setUser: setUser,
            orderItems:orderItems,
            setOrderItems: setOrderItems
            }}
        >
            {children}
        </UserContext.Provider>
    )
}