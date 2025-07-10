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
            <button id="historyBtn" onClick={toggleHistory} className={`ml-8 mt-8 text-[#ffffff]  text-4xl pt-1 pb-1 pl-5 pr-5 border-2 border-[#495057] rounded-3xl hover:cursor-crosshair`}>History</button>
            {showHistory && (<div id="historyDiv" className="ml-26 text-[#878787] font-medium text-xl ">
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
               
               
            </div>)}
        </div>
    )
}




