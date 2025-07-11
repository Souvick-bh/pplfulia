"use client"
import { useState } from "react";
import { TbLogin2 } from "react-icons/tb";
import { IoHome,IoPeopleCircleOutline,IoInformationCircle } from "react-icons/io5";
import { PiCardsBold } from "react-icons/pi";
import { TiThMenu } from "react-icons/ti";

 

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
                {isActive && (<h2 className="text-[#ffffff] pl-3 text-lg sm:text-2xl">Menu</h2>)}
            </div>
            {sidebarItems.map((item,index)=>(
               <div key={index} className="pt-5 flex flex-row  items-center cursor-pointer  ">
                    <div className="text-3xl sm:text-5xl">{item.icon} </div>
                    {isActive && (<h2 className=" text-[#ffffff] text-lg sm:text-2xl pl-3 ">{item.name}</h2>)}
                </div>
            ))}
        </div>
    )
}