"use client";
import { useState } from "react";
import { motion } from "framer-motion"

export default function HistoryFramer() {
    const [showHistory, setShowHistory] = useState(false);
    

    function toggleHistory() {
        setShowHistory((prev) => !prev);
        
    }
   
    return(
        <div className="flex flex-col justify-center items-center mb-0">
            <button id="historyBtn" onClick={toggleHistory} className={`items-center justify-center transition-all duration-500 ease-in-out 
                 text-4xl pt-1 pb-1 pl-5 pr-5 mt-12 border-2 border-[#495057] rounded-3xl hover:cursor-crosshair
                 ${showHistory?"bg-[#ffffff] mb-12":"bg-[#000000] mb-0"} ${showHistory?"text-[#000000]":"text-[#ffffff]"}`}>History</button>
                 <div className={` mb-8 text-[#878787] font-medium text-xl transition-all duration-700 ease-in-out
                    ${showHistory? "opacity-100 translate-y-0" : "opacity-0 translate-y-2" }`}>
            
                    {showHistory? (
                        <div>
                            
                                <motion.div initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} transition={{duration:1.5}}
                                    className="bg-[#272727] rounded-2xl p-2 mb-12">
                                    <div className="text-xl md:text-2xl text-center">Kasukabe Defence Group </div>
                                    <div className="text-lg md:text-xl text-center">created on 21st March, 2020.</div>
                                    
                                </motion.div>
                            
                               
                                <motion.div initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} transition={{duration:1.5}}
                                    className="bg-[#272727]  rounded-2xl p-2 mb-12">
                                    <div className="text-xl md:text-2xl text-center">PPL Season 1</div>
                                    <div className="text-lg md:text-xl text-center">22nd October 2020.</div>
                                </motion.div>
                            
                                
                                <motion.div initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} transition={{duration:1.5}}
                                    className="bg-[#272727]  rounded-2xl p-2 mb-12">
                                    <div className="text-xl md:text-2xl text-center">PPL Season 2</div>
                                    <div className="text-lg md:text-xl text-center">11th October 2021.</div>
                                </motion.div>
                            
                               
                                <motion.div initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} transition={{duration:1.5}}
                                    className="bg-[#272727]  rounded-2xl p-2 mb-12">
                                    <div className="text-xl md:text-2xl text-center">PPL Season 3</div>
                                    <div className="text-lg md:text-xl text-center">1st October 2022.</div>
                                </motion.div>
                            
                              
                                <motion.div initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} transition={{duration:1.5}}
                                    className="bg-[#272727]  rounded-2xl p-2 mb-12">
                                    <div className="text-xl md:text-2xl text-center">PPL Season 4</div>
                                    <div className="text-lg md:text-xl text-center">20th October 2023.</div>
                                </motion.div>
                            
                                
                                <motion.div initial={{opacity:0, scale:0}} whileInView={{opacity:1, scale:1}} transition={{duration:1.5}}
                                    className="bg-[#272727]  rounded-2xl p-2">
                                    <div className="text-xl md:text-2xl text-center">PPL Season 5</div>
                                    <div className="text-lg md:text-xl text-center">9th October 2024</div>
                                </motion.div>
                            
                        </div>
                    ): (
                        <div>
                            
                        </div>
                    )}
                    
                
               
            </div>
        </div>
    )
}




