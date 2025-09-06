"use client"
import Link from "next/link";
import { useState } from "react";


export default function Sidebar() {

    const [isActive, setIsActive] = useState(true);

    const sidebarItems = [
        { name: "Home", icon: <img src="/icons/home.jpg" />, path: "/" },
        { name: "Members", icon:  <img src="/icons/members.jpg"  />, path: "/members" },
        { name: "Blogs", icon:  <img src="/icons/blog.jpg" />, path: "/seasons" },
        { name: "Gallery", icon:  <img src="/icons/gallery.jpg" />,path: "/gallery"},
        { name: "About", icon:  <img src="/icons/about.jpg"  />, path: "/about" },
        
    ];
    function toggleSidebar() {
        setIsActive(!isActive);
    }

    return(
        <div className="flex flex-col mt-8 mr-4 ml-4  text-[#ffffff] duration-300 ease-in-out">
            <div onClick={toggleSidebar} className="cursor-pointer flex flex-row items-center text-md active:text-[#535558]">
                <div className="transition-all duration-500 text-2xl md:text-3xl active:text-[#535558]"> <img className="w-[25px] md:w-[35px]" src="/icons/menu01.jpg"  /></div>
                
                <div className={`transition-all duration-500 ease-in-out pl-3 items-center text-[#ffffff] text-2xl md:text-3xl text-shadow-lg/30 active:text-[#535558] 
                         ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2" }`} style={{minWidth:isActive? "100px" : "0px"}}>Menu</div>
                
            </div>
            {sidebarItems.map((item,index)=>(
               <div key={index} >
                    <Link className="pt-4 md:pt-6 flex flex-row items-center cursor-pointer active:text-[#535558]" href={item.path}>
                        <div className="transition-all duration-500 w-[25px] md:w-[35px]">{item.icon} </div>
                        <div className={`transition-all duration-500 ease-in-out pl-3  text-[#ffffff] text-2xl md:text-3xl text-shadow-lg/90 active:text-[#535558]  
                        ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2" }`} style={{minWidth:isActive? "100px" : "0px"}}>{item.name}</div>
                    </Link>
                    
                </div>
            ))}
        </div>
    )
}