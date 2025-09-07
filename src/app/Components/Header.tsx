"use client"
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [kdg, setKdg] = useState(false);
  function toggleKdg() {
    setKdg((prev)=> !prev);
  }
    
  return (
    <div className={`flex flex-col min-w-full items-end justify-end pt-8  pl-8 pr-8`}>
        <div onClick={toggleKdg} className={`${kdg?"bg-[#ffffff]":"bg-[#000000]"} ${kdg?"text-[#000000]":"text-[#ffffff]"}
        pt-1 pb-1 pl-5 pr-5 text-3xl border-2 border-[#495057] rounded-3xl hover:cursor-crosshair `} >KDG</div>
      <Link href="/auth">
                      <button className=" mt-5 mr-2 md:mr-2 rounded-[50%] text-shadow-lg text-[#ffffff]  cursor-pointer bg-[#454545] active:bg-[#1d1c1c] border-2 border-[#252921]">
                         <img className="w-9 h-9 rounded-[50%]" src="/icons/membermonkey.jpg" alt="" />
                      </button>
                  </Link>
    </div>
  )
}

