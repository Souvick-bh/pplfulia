"use client"
import Link from 'next/link'
import { RiArrowGoBackLine } from "react-icons/ri";
import { VT323 } from "next/font/google"
const vt323 = VT323({
      subsets:["latin"],
      weight: "400",
})



export default function Gallery() {

    return(
        <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col items-center justify-center`}>
            <Link href="/">
                <button className="absolute mt-5 ml-10 pt-2 pb-2 pl-4 pr-4 rounded-4xl cursor-pointer active:bg-[#1d1c1c] border-2 border-[#252921] top-0 left-0">
                    <RiArrowGoBackLine />
                </button>
            </Link>
            <h1 className="text-4xl">Very Soon...</h1>
            <h1 className="text-2xl">Cause, we believe in fast shipments</h1>
        </div>
    )
}