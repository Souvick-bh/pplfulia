"use client"

import ImageUpload from '../Components/ImageUploader'
import React,{useState} from 'react'
import Link from 'next/link'
import { useProfile } from '../hooks/useProfile'

import { RiArrowGoBackLine } from "react-icons/ri";
import { VT323 } from "next/font/google"
const vt323 = VT323({
      subsets:["latin"],
      weight: "400",
})



function Uploading() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const {profile} = useProfile();
    
      const handleUploadSuccess = () => {
        setRefreshTrigger(refreshTrigger + 1);
      };
  return (
    <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col items-center  pt-12`}>
        <Link href="/gallery">
                <button className="absolute mt-5 ml-5 md:ml-10 pt-2 pb-2 pl-4 pr-4 rounded-4xl cursor-pointer bg-[#454545] active:bg-[#1d1c1c] border-2 border-[#252921] top-0 left-0">
                    <RiArrowGoBackLine />
                </button>
            </Link>
            {!profile?(
              <div >Log in first</div>
            ):profile.role === 'owner' || profile.role ===  'player'?(
              <ImageUpload  onUploadSuccess={handleUploadSuccess} />
            ):(
              <div >You need to be a Player or Owner to upload images.</div>
            )}
        
    </div>
  )
}

export default Uploading