"use client"

import ImageUpload from '../Components/ImageUploader'
import React,{useState} from 'react'
import { VT323 } from "next/font/google"
const vt323 = VT323({
      subsets:["latin"],
      weight: "400",
})

function Uploading() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
      const handleUploadSuccess = () => {
        setRefreshTrigger(prev => prev + 1);
      };
  return (
    <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col items-center  pt-12`}>
        <ImageUpload  onUploadSuccess={handleUploadSuccess} />
    </div>
  )
}

export default Uploading