"use client";

import React from 'react'

function Children({children} : {children: React.ReactNode}) {
  return (
    <div className='max-w-7xl mx-auto p-4'>
        {children}
        
    </div>
  )
}

export default Children