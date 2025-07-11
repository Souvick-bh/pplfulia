"use client"
import { useState } from "react";
import { TbLogin2 } from "react-icons/tb";
import { IoHome,IoPeopleCircleOutline,IoInformationCircle } from "react-icons/io5";
import { PiCardsBold } from "react-icons/pi";
import { TiThMenu } from "react-icons/ti";
import { style } from "framer-motion/client";

 

export default function Sidebar() {

    const [isActive, setIsActive] = useState(false);

    const sidebarItems = [
        { name: "Home", icon: <IoHome  />, path: "/" },
        { name: "Members", icon: <IoPeopleCircleOutline  />, path: "/players" },
        { name: "Seasons", icon: <PiCardsBold  />, path: "/history" },
        { name: "About", icon: <IoInformationCircle  />, path: "/about" },
        { name: "Login", icon: <TbLogin2  />, path: "/login" }
    ];
    function toggleSidebar() {
        setIsActive(!isActive);
    }

    return(
        <div className="flex flex-col mt-8 mr-4 ml-4  text-[#ffffff] duration-300 ease-in-out">
            <div onClick={toggleSidebar} className="cursor-pointer flex flex-row text-md">
                <div className="text-3xl sm:text-5xl"><TiThMenu  /></div>
                
                <div className={`transition-all duration-500 ease-in-out pl-3 items-center text-[#ffffff] text-lg sm:text-2xl text-shadow-lg/30  
                         ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1/2" }`} style={{minWidth:isActive? "100px" : "0px"}}>Menu</div>
                
            </div>
            {sidebarItems.map((item,index)=>(
               <div key={index} className="pt-5 flex flex-row  items-center cursor-pointer  ">
                    <div className="text-3xl sm:text-5xl">{item.icon} </div>
                    <div className={`transition-all duration-500 ease-in-out pl-3  text-[#ffffff] text-lg sm:text-2xl text-shadow-lg/30  
                         ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1/2" }`} style={{minWidth:isActive? "100px" : "0px"}}>{item.name}</div>
                </div>
            ))}
        </div>
    )
}