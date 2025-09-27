"use client";

import React, from 'react'
import Children from '../children/Children'
import supabase from '../../lib/Supabase'
import Slots from '../../screens/slots/page';
import { Cover } from "@/components/ui/cover";

// import Login from '@/app/screens/Login'


console.log("the connection is builded with supabase", supabase)

function Main() {

  return (
    <div className=''>

      <div>

      </div>
        <Children>
           <div>
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        You May See Your All<br /> at <Cover>Slot's</Cover>
      </h1>
    </div>

    <div>

          <Slots/>
    </div>



        </Children>

    </div>
  )
}

export default Main