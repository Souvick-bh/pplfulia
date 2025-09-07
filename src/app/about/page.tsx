"use client"
import { useState } from "react";
import { VT323 } from "next/font/google"
import Sidebar from "../Components/Sidebar"
import { FaSquareXTwitter,FaGithub,FaInstagram } from "react-icons/fa6";

const vt323 = VT323({
      subsets:["latin"],
      weight: "400",
});

export default function About() {
    const [aboutState, setAboutState] = useState(false);
    const [location,setLocation] = useState(0);


      function toggleAboutState() {
        setAboutState((prev)=> !prev);
        setLocation(Math.floor(Math.random()*100)) ;
      }
        


    return(
        <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col `}>

            <div className="flex flex-row">
            
                  <div className="absolute flex items-center">
                      <Sidebar />
                  </div>

                  <div className="relative ml-35 mr-6 sm:ml-50">

                    <div className="flex justify-center">
                        <div className="border-[#717273] w-50 border-2 mt-10 lg:mt-20 pt-3 pb-3 pl-2 rounded-3xl">
                        <span  onClick={toggleAboutState} style={{ left: `${location}px` }} className={`${aboutState?"bg-[#ea5e00]":"bg-[#000000]"} 
                        ${aboutState?"text-[#000000] font-bold":"text-[#ffffff]"} relative  pt-2 pb-2 pl-4 pr-4 text-lg border-[#717273] border-2 
                        rounded-2xl transition-all duration-500 inset-shadow-sm inset-shadow-[#000000] cursor-crosshair`}>About</span>
                        </div>
                    </div>
                    

                    
                    <div className="text-lg lg:text-2xl mt-10 lg:mt-20 ">What happens when a group of high school friends,
                        some with cricketing talent and most with too much free time,
                        decide to start something epic? <span className="text-[#ea5e00]">Panchayet Premiere League</span> happens.</div>
                  </div>

            </div>

            <div className="mt-15 ml-8 mr-6 flex flex-col">
                

                <div>
                    <h1 className="text-2xl lg:text-3xl mt-5 text-shadow-lg/30 text-shadow-[#ea5e00] text-center sm:ml-35">From Gallis to Glory</h1>
                    <div className="text-lg lg:text-2xl mt-10 sm:ml-35">What started as a friendly neighborhood tournament quickly turned
                        into an annual festival of chaos, charisma, and cricket. We ave had:
                        <div className="flex flex-col items-center mt-10 text-[#ea5e00]"><div>Match-fixing allegations</div>
                        <div>Rain-interrupted matches</div>
                        <div>MVP awards</div></div>
                    </div>
                    <div className="text-lg lg:text-2xl mt-10 ">And guess what? We are not just still going — we are growing! This year marks our <span className="text-[#ea5e00]">6th Season</span>,
                        and the spirit is crazier than ever. More teams, more sledging, and hopefully, fewer torn ligaments.</div>
                </div>

                <div className="text-xl lg:text-3xl mt-20 ">
                    We are now building this website to preserve those memories, honor those classic moments, and give our beloved league the stage it deserves. Because one day, we will look back at this and say:
                    <span className="text-[#ea5e00]">Remember when we thought we were IPL stars?</span>
                </div>

                <div className="text-xl lg:text-3xl mt-20 mb-30">
                    Browse through old photos, match reports, bloopers, and the drama that only true PPL fans understand. Whether you are one of us or just here to laugh at us —
                    Welcome to Panchayet Premiere League.
                    Where friendship meets fierce competition... 
                </div>

                

                <div className="flex flex-row text-lg md:text-3xl mb-40">
                    <h1 className="pl-2 pr-2">The Dev : Souvick Bhowmick</h1>
                    <div className="flex flex-row justify-center items-center gap-4">
                        <a href='https://x.com/SouvickBho17054'>
                            <FaSquareXTwitter  className='cursor-pointer text-amber-50 active:text-[#717273]' />
                        </a>
                        <a href='https://github.com/Souvick-bh'>
                            <FaGithub className='cursor-pointer text-amber-50 active:text-[#717273]'/>
                        </a>
                        <a href="https://www.instagram.com/__souvick_bhowmick__/">
                            <FaInstagram className='cursor-pointer text-amber-50 active:text-[#717273]'/>
                        </a>
                    </div>
                    
                </div>

            </div>
            
        </div>
    )
}
