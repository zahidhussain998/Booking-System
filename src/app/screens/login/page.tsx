"use client";
import React, { useState } from "react";
// import {signup } from "../../auth/callback/actions/Login";
import GoogleOneTapLogin from "../../components/GoogleOneTapLogin";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

function Login() {

  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


   const supabase =  createClientComponentClient()


  const handleInput = async (e: React.FormEvent, type: "singIn" | "singUp") => {

    e.preventDefault()


    let response;
     if(type == "singUp"){
      response = await supabase.auth.signUp({email, password, })
    }
    else{
    response = await supabase.auth.signInWithPassword({email, password,})
    }
    

     const { error } = response;
  if (error) {
    throw Error("Authentication failed");
  }

    console.log(response)
  

  
    window.location.href = "/"


  }
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-200 via-yellow-100 to-white">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 transform transition-all duration-500 hover:scale-[1.02]">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6 text-amber-600 animate-pulse">
          Welcome Back 👋
        </h1>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
                value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition"
            />
          </div>

          <div className="flex justify-between gap-3">
            <button
              className="flex-1 bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-xl py-2 px-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              onClick={(e) => handleInput(e, "singIn")}
            >
              Log in
            </button>
            <button
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-xl py-2 px-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              onClick={(e) => handleInput(e, "singUp")}
            >
              Sign up
            </button>
          </div>

          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-gray-500">or</span>
            </div>
          </div> */}

          {/* Google One Tap Login */}
          <div className="flex justify-center">
            <GoogleOneTapLogin />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
