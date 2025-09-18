"use client"
import { supabase2 } from '@/api/user';

import React, { useState } from 'react'
import { VT323 } from "next/font/google";
const vt323 = VT323({
      subsets:["latin"],
      weight: "400",
});

function ForgetPassword() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [notice,setNotice] = useState('')
    const [wrong,setWrong] = useState(false)
    
    async function handleUpdatePassword() {
        if(password.trim().length < 6) {
                setNotice('Password should contain more chars')
                setWrong(true)
                return;
            }
        const { error } = await supabase2.auth.updateUser({
            password: password
        })
        if (error) {
            console.log(error);
        }
    }

  return (
    <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col justify-center items-center`}>
        <div className='flex flex-col pt-4 pb-4 pr-8 pl-8 border-2 border-[#252525] rounded-xl justify-center items-center gap-x-5'>
            {wrong && (
                <div>
                    {notice}
                </div>
            )}
            <input className="pt-1 pb-1 pl-3 pr-3 mb-4 rounded-xl border-1 border-[#292929] text-center" type="email" placeholder="Enter your email"
                    required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input className="pt-1 pb-1 pl-3 pr-3 mb-4 rounded-xl border-1 border-[#292929] text-center" type="password" placeholder="Enter new password"
                    required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className=" pt-1 pb-1 pl-3 pr-3 w-fit mb-4 rounded-xl border-1 border-[#292929] text-center active:bg-[#3f3f3f]" onClick={handleUpdatePassword}>Change</button>
        </div>
    </div>
  )
}

export default ForgetPassword