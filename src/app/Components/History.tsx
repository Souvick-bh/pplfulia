"use client";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";



export default function History() {
    const [showHistory, setShowHistory] = useState(false);
    

    function toggleHistory() {
        setShowHistory((prev) => !prev);
        
    }
   
    return(
        <div>
            <button id="historyBtn" onClick={toggleHistory} className={`ml-8 mt-8  transition-all duration-500 ease-in-out 
                 text-4xl pt-1 pb-1 pl-5 pr-5 border-2 border-[#495057] rounded-3xl hover:cursor-crosshair
                 ${showHistory?"bg-[#ffffff]":"bg-[#000000]"} ${showHistory?"text-[#000000]":"text-[#ffffff]"}`}>History</button>
                 <div className={`ml-26 mb-8 text-[#878787] font-medium text-xl transition-all duration-700 ease-in-out
                    ${showHistory? "opacity-100 translate-y-0" : "opacity-0 translate-y-2" }`}>
            
                    {showHistory? (
                        <div>
                            <div className="motion-line">
                                <FaArrowRight />
                                <div className="bg-[#272727]  rounded-2xl p-2">
                                    <div>Text1</div>
                                    <div>Text2</div>
                                    <div>Text3</div>
                                </div>
                            </div>

                            <div className="motion-line">
                                <FaArrowRight />
                                <div className="bg-[#272727]  rounded-2xl p-2">
                                    <div>Text1</div>
                                    <div>Text2</div>
                                    <div>Text3</div>
                                </div>
                            </div>

                            <div className="motion-line">
                                <FaArrowRight />
                                <div className="bg-[#272727]  rounded-2xl p-2">
                                    <div>Text1</div>
                                    <div>Text2</div>
                                    <div>Text3</div>
                                </div>
                            </div>

                            <div className="motion-line">
                                <FaArrowRight />
                                <div className="bg-[#272727]  rounded-2xl p-2">
                                    <div>Text1</div>
                                    <div>Text2</div>
                                    <div>Text3</div>
                                </div>
                            </div>
                        </div>
                    ): (
                        <div>
                            
                        </div>
                    )}
                    
                
               
            </div>
        </div>
    )
}




