"use client"
import React,{useEffect, useState} from "react"
import { useRouter } from "next/navigation";
import { supabase2 } from "@/api/user"
import { useAuth } from "../contexts/AuthContext"
import Link from "next/link";
import {RiArrowGoBackLine} from 'react-icons/ri'

import { VT323 } from "next/font/google"
const vt323 = VT323({
      subsets:["latin"],
      weight: "400",
})

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [wrongPassword,setWrongPassword] = useState(false);

  

  const router = useRouter();

  useEffect(() => {
    if (user) {
        router.replace('/profile');
    }
  }, [user,router]);

   const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
        if (isSignUp) {
            const { error } = await supabase2.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `https://pplfulia.vercel.app/`,
                data: {
                full_name: fullName,
                },
            },
            });

            if (error) throw error;
            alert('Check your email for the confirmation link.');

            } else {
            const { error } = await supabase2.auth.signInWithPassword({
            email,
            password,
            });

            if (error) {
                setWrongPassword(true);
            };
            
            router.replace('/profile');
        } 
        } catch (error: any) {
        if (error) throw error;
        } finally {
        setLoading(false);
        }
    };

//   const handleGoogleAuth = async () => {
//     try {
//       const { error } = await supabase2.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: `${window.location.origin}/`,
//         },
//       });

//       if (error) throw error;
//     } catch (error: any) {
//         if(error) throw error;
//     }
//   };   

  return(
    <div className={`${vt323.className} bg-[#000000] text-[#ffffff] min-h-screen flex flex-col items-center justify-center`}>
        <Link href="/">
            <button className="absolute mt-5 ml-5 md:ml-10 pt-2 pb-2 pl-4 pr-4 rounded-4xl cursor-pointer bg-[#454545] active:bg-[#1d1c1c] border-2 border-[#252921] top-0 left-0">
                <RiArrowGoBackLine />
            </button>
        </Link>
        <div className="flex flex-col justify-center border-2 border-[#252525] pt-12 pb-12 pl-12 pr-12 rounded-2xl text-lg md:text-xl">

            <div className="text-center text-xl md:text-2xl mb-4">
                {isSignUp?'Become A Part Of PPL':'Welcome Buddy'}
            </div>
            <div className="text-center mb-8">
                {isSignUp?'Create your account':'Sign in to your club account'}
            </div>

            <div className="text-center mb-4">
                {wrongPassword?(
                    <div className="text-red-500 font-medium">Enter correct password</div>
                ):(null)}
            </div>
            {/* <button className="pt-1 pb-1 pl-3 pr-3 mb-12 rounded-xl border-1 border-[#292929]" onClick={handleGoogleAuth}>Continue with Google</button> */}

            <form onSubmit={handleAuth} className="flex flex-col justify-center">
                {isSignUp && (
                    <div className="pt-1 pb-1 pl-3 pr-3 mb-4 rounded-xl border-1 border-[#292929]">
                        <input  type="text" placeholder="Enter Full Name"
                          required={isSignUp} value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
                    </div>
                )}

                <div className="flex justify-center">
                    <input className="pt-1 pb-1 pl-3 pr-3 mb-4 rounded-xl border-1 border-[#292929] text-center" type="email" placeholder="Enter your email"
                    
                    required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div className="flex justify-center">
                    <input className="pt-1 pb-1 pl-3 pr-3 mb-4 rounded-xl border-1 border-[#292929] text-center" type="password" placeholder="Enter your password"
                      required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <button className=" pt-1 pb-1 pl-3 pr-3 mb-4 rounded-xl border-1 border-[#292929] text-center active:bg-[#3f3f3f]">
                    {loading?'Please wait...':isSignUp?'Create account':'Sign in'}
                </button>
            </form>

            <div>
                <button className="text-[#ea5e00]" onClick={()=>setIsSignUp(!isSignUp)}>
                    {isSignUp?'Already have an account? Sign in'
                    : "Don't have an account? Sign up"}
                </button>
            </div>
        </div>

    </div>
  );
};

export default Auth;