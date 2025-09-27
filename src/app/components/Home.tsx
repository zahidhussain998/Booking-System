"use client"

import React, { useEffect, useState } from 'react'
// import Login from '../screens/Login/page'
import Link from 'next/link'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"


import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
function Home() {

  const [user, setUser] = useState<any>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



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

 const navItems = [
   {
     name: "Home",
     link: "/",
   },
    {
      name: "Create-Slot",
      link: "/screens/PostBooking",
    },
   
    {
      name: "Booked-Slots",
      link: "/screens/allbooked",
    },
  ];
 


  return (

    <div>
    {/* Background grid - only visible behind content */}
    <div className="fixed inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] -z-10"></div>

    <div className=' sticky top-0 z-40'>

        <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
              <NavbarButton
                variant="primary"
                className="w-full"
              >
            {!user ?
             (
              
              <Link href="/screens/login">Login</Link>
            ):(
            <button className='cursor-pointer bg-amber-200 rounded-e-full' onClick={handleSingOut}>Sign Out</button>

             )}

              </NavbarButton>
          </div>
        </NavBody>
 
        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
 
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
 
      {/* Navbar */}
    </div>
        
     
    </div>
    </div>


  )
}

export default Home