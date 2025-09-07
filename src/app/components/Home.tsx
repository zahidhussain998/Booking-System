"use client"

import React, { useEffect, useState } from 'react'
// import Login from '../screens/Login/page'
import Link from 'next/link'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"


function Home() {

  const [user, setUser] = useState<any>(null)

  const supabase = createClientComponentClient()

  useEffect(() => {

    const getUser  = async () => {
      const {data} = await supabase.auth.getUser()

      setUser(data.user)

    }

    getUser()


    const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

   

    return () => {
      listener.subscription.unsubscribe()
    }
 

    
  }, [supabase])


  
  const  handleSingOut = async() => {
     await supabase.auth.signOut()
    setUser(null)  
 }

  return (
    <div className='h-10 w-auto bg-amber-300 p-10 m-5 '>
        
        <nav className=' flex gap-30 justify-between '>
            {/* logo */}
            logo
            <ul className='flex gap-10 justify-center  '>
               <Link href="/">
                Home
               </Link>
               <Link href="/screens/booking">
                Book Appointment
               </Link>
               <Link href="/screens/slots">
                new slots  
               </Link>

            </ul>
            <div className='flex space-x-5'>

              <p>Profile</p>

            {!user ?
             (
              
              <Link href="/screens/login">Login</Link>
            ):(
            <button className='cursor-pointer bg-amber-200 rounded-e-full' onClick={handleSingOut}>Sign Out</button>

             )}


         
            </div>
        </nav>
    </div>
  )
}

export default Home