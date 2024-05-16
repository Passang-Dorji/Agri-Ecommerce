import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    return (
        <div className="flex w-full">
            <div className="relative left-12">
                <button
                    className=" text-black  mt-2"
                    onClick={() => onSearch(search)}
                >
                    <svg className="w-7 h-7 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>
                </button>     
            </div>
            <input
                className="bg-white border-2 border-black rounded-lg text-black pl-16 w-full h-11 text-xl"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className="relative right-10 top-[-2px]"
                onClick={()=>setSearch("")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}

export default SearchBar;