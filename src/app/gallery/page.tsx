"use client"
import Link from 'next/link'
import ImageGallery from '../Components/GalleryComp'
import { RiArrowGoBackLine } from "react-icons/ri";
import { VT323 } from "next/font/google"
const vt323 = VT323({
      subsets:["latin"],
      weight: "400",
})

export default function Gallery() {

    const refreshTrigger = 0;

    return(
        <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col items-center  pt-12`}>
            <Link href="/">
                <button className="absolute mt-5 ml-5 md:ml-10 pt-2 pb-2 pl-4 pr-4 rounded-4xl cursor-pointer bg-[#454545] active:bg-[#1d1c1c] border-2 border-[#252921] top-0 left-0">
                    <RiArrowGoBackLine />
                </button>
            </Link>
            
            <Link href="/uploading">
                <div className='absolute mt-5 mr-5 top-0 right-0 pt-1 pb-1 pl-4 pr-4 rounded-4xl cursor-pointer bg-[#454545] active:bg-[#1d1c1c] border-2 border-[#252921] '>
                    Upload
                </div>
            </Link>
        
        <ImageGallery refreshTrigger={refreshTrigger} />
            
            {/* <h1 className="text-4xl">Very Soon...</h1>
            <h1 className="text-2xl">Cause, we believe in fast shipments</h1> */}
        </div>
    )
}