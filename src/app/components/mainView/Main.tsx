"use client";

import React, from 'react'
import Children from '../children/Children'
import supabase from '../../lib/Supabase'
import Booked from '../Booked/Booked';
// import Login from '@/app/screens/Login'


console.log("the connection is builded with supabase", supabase)

function Main() {

  return (
    <div>
        <Children>
            main
            <Booked/>



        </Children>

    </div>
  )
}

export default Main