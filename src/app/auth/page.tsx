"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { supabase2 } from "@/api/user";

import { useAuth } from "../contexts/AuthContext";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");

  const [loading, setLoading] = useState(false);

  const [wrong, setWrong] = useState(false);

  const [notice, setNotice] = useState("");

  const [resetLoading, setResetLoading] = useState(false);

  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/profile");
    }
  }, [user, router]);

  const handleForgotPassword = async () => {

  if (!email) {
    setNotice("Enter your email first");
    setWrong(true);
    return;
  }

  setResetLoading(true);
  setWrong(false);

  const { error } = await supabase2.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: `${window.location.origin}/reset-password`
    }
  );


  if (error) {
    setNotice(error.message);
    setWrong(true);
    setResetLoading(false);
    return;
  }


  setNotice("Password reset link sent. Check your email.");
  setWrong(true);

  setResetLoading(false);
};

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setWrong(false);

    try {
      if (isSignUp) {
        if (fullName.trim().length < 3) {
          setNotice("Name should have at least 3 characters");
          setWrong(true);
          return;
        }

        if (password.length < 6) {
          setNotice("Password should contain 6+ characters");
          setWrong(true);
          return;
        }

        const { error } = await supabase2.auth.signUp({
          email,
          password,

          options: {
            emailRedirectTo: "https://pplfulia.vercel.app/",

            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        alert("Check your email for confirmation");
      } else {
        const { error } = await supabase2.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setNotice("Incorrect email or password");
          setWrong(true);
          return;
        }

        router.replace("/profile");
      }
    } catch (error: any) {
      setNotice(error.message);
      setWrong(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
min-h-screen
w-full

bg-[#f5f0e8]

flex
items-center
justify-center

px-4
"
    >
      <div
        className="
w-full
max-w-md

border-4
border-black

bg-white

p-8

shadow-[10px_10px_0_black]

"
      >
        <h1
          className="
text-center

text-4xl

font-black

uppercase

tracking-tight

mb-2
"
        >
          {isSignUp ? "Join PPL" : "Welcome Buddy"}
        </h1>

        <p
          className="
text-center

font-bold

uppercase

text-sm

mb-8
"
        >
          {isSignUp
            ? "Become part of the community"
            : "Sign in to your club account"}
        </p>

        {wrong && (
          <div
            className="
mb-5

border-4
border-black

bg-red-300

p-3

font-black

text-sm

uppercase

"
          >
            {notice}
          </div>
        )}

        <form
          onSubmit={handleAuth}
          className="
flex
flex-col
gap-4
"
        >
          {isSignUp && (
            <input
              type="text"
              placeholder="FULL NAME"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="
border-4
border-black

bg-yellow-100

px-4
py-3

font-bold

uppercase

outline-none

focus:bg-yellow-300

"
            />
          )}

          <input
            type="email"
            placeholder="EMAIL"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
border-4
border-black

px-4
py-3

font-bold

outline-none

focus:bg-blue-200

"
          />

          <input
            type="password"
            placeholder="PASSWORD"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
border-4
border-black

px-4
py-3

font-bold


outline-none

focus:bg-blue-200

"
          />

          <button
            disabled={loading}
            className="
border-4
border-black

bg-red-400

px-6
py-3

font-black

uppercase

shadow-[5px_5px_0_black]

transition-all

hover:-translate-x-1
hover:-translate-y-1

hover:shadow-[8px_8px_0_black]

active:translate-x-1
active:translate-y-1
active:shadow-none

"
          >
            {loading ? "WAIT..." : isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
          </button>
        </form>

        {!isSignUp && (
  <button
    type="button"
    onClick={handleForgotPassword}
    disabled={resetLoading}
    className="
    mt-4
    w-full
    border-4
    border-black
    bg-yellow-300
    px-6
    py-3
    font-black
    uppercase
    shadow-[5px_5px_0_black]
    hover:-translate-x-1
    hover:-translate-y-1
    "
  >
    {resetLoading ? "SENDING..." : "FORGOT PASSWORD?"}
  </button>
)}

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="
mt-6

w-full

border-t-4

border-black

pt-4

font-black

uppercase

text-sm

hover:text-red-500

"
        >
          {isSignUp ? "Already a member? Sign in" : "New here? Create account"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
