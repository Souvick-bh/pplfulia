"use client"
import Link from "next/link";
import { useState } from "react";
import { GrGallery } from "react-icons/gr";
import { IoHome,IoPeopleCircleOutline,IoInformationCircle } from "react-icons/io5";
import { PiCardsBold } from "react-icons/pi";
import { TiThMenu } from "react-icons/ti";



export default function Sidebar() {

    const [isActive, setIsActive] = useState(false);

    const sidebarItems = [
        { name: "Home", icon: <IoHome  />, path: "/" },
        { name: "Members", icon: <IoPeopleCircleOutline  />, path: "/members" },
        { name: "Seasons", icon: <PiCardsBold  />, path: "/seasons" },
        { name: "Gallery", icon: <GrGallery />,path: "/gallery"},
        { name: "About", icon: <IoInformationCircle  />, path: "/about" },
        
    ];
    function toggleSidebar() {
        setIsActive(!isActive);
    }

    return(
        <div className="flex flex-col mt-8 mr-4 ml-4  text-[#ffffff] duration-300 ease-in-out">
            <div onClick={toggleSidebar} className="cursor-pointer flex flex-row items-center text-md">
                <div className="text-xl sm:text-2xl md:text-3xl"><TiThMenu  /></div>
                
                <div className={`transition-all duration-500 ease-in-out pl-3 items-center text-[#ffffff] text-2xl md:text-3xl text-shadow-lg/30  
                         ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2" }`} style={{minWidth:isActive? "100px" : "0px"}}>Menu</div>
                
            </div>
            {sidebarItems.map((item,index)=>(
               <div key={index} >
                    <Link className="pt-5 flex flex-row  items-center cursor-pointer active:text-[#535558]" href={item.path}>
                        <div className="text-2xl md:text-3xl">{item.icon} </div>
                        <div className={`transition-all duration-500 ease-in-out pl-3  text-[#ffffff] text-2xl md:text-3xl text-shadow-lg/90  
                        ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2" }`} style={{minWidth:isActive? "100px" : "0px"}}>{item.name}</div>
                    </Link>
                    
                </div>
            ))}
        </div>
    )
}