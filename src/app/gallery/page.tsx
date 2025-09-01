"use client"
import Link from 'next/link'
import { useState } from 'react'
import ImageUpload from '../Components/ImageUploader'
import ImageGallery from '../Components/GalleryComp'
import { RiArrowGoBackLine } from "react-icons/ri";
import { VT323 } from "next/font/google"
const vt323 = VT323({
      subsets:["latin"],
      weight: "400",
})

export default function Gallery() {

      const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

    return(
        <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col items-center  pt-12`}>
            <Link href="/">
                <button className="absolute mt-5 ml-10 pt-2 pb-2 pl-4 pr-4 rounded-4xl cursor-pointer bg-[#454545] active:bg-[#1d1c1c] border-2 border-[#252921] top-0 left-0">
                    <RiArrowGoBackLine />
                </button>
            </Link>
            {/* <div className='mt-8 mb-8 border-[#272727] border-2 pt-6 pb-8 pl-12 pr-12 rounded-4xl '>
                <Uploading />
            </div> */}

            <div className="flex justify-center">
          <ImageUpload onUploadSuccess={handleUploadSuccess} />
        </div>
        
        <ImageGallery refreshTrigger={refreshTrigger} />
            
            <h1 className="text-4xl">Very Soon...</h1>
            <h1 className="text-2xl">Cause, we believe in fast shipments</h1>
        </div>
    )
}