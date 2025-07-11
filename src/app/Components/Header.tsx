"use client"
import { useState } from "react";

export default function Header() {
  const [kdg, setKdg] = useState(false);
  function toggleKdg() {
    setKdg((prev)=> !prev);
  }
    
  return (
    <div className={` text-3xl flex flex-row items-center justify-end pt-8  pl-8 pr-8`}>
        <div onClick={toggleKdg} className={`${kdg?"bg-[#ffffff]":"bg-[#000000]"} ${kdg?"text-[#000000]":"text-[#ffffff]"}
        pt-1 pb-1 pl-5 pr-5 border-2 border-[#495057] rounded-3xl hover:cursor-crosshair `} >KDG</div>

    </div>
  )
}

