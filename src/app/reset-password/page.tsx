"use client"

import { supabase2 } from "@/api/user";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function ResetPassword(){

    const router = useRouter();

    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");


    async function updatePassword(){

        if(password.length < 6){
            setMessage("Password must be at least 6 characters");
            return;
        }


        const {error} = await supabase2.auth.updateUser({
            password
        });


        if(error){
            setMessage(error.message);
            return;
        }


        setMessage("Password updated successfully");


        setTimeout(()=>{
            router.push("/login");
        },1500)

    }



    return (

        <div className="min-h-screen bg-black text-white flex justify-center items-center">

            <div className="border p-8 rounded-xl flex flex-col gap-4">

                <h1>
                    Set New Password
                </h1>


                <input
                    className="text-black p-2 rounded"
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />


                <button
                    className="border p-2 rounded"
                    onClick={updatePassword}
                >
                    Update Password
                </button>


                {
                    message &&
                    <p>{message}</p>
                }

            </div>

        </div>

    )
}