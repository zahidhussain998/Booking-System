"use client";

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchRooms } from '../../store/userSlice';
import Link from 'next/link';


function Page() {
    const { items, loading, } = useSelector((state: RootState) => state.user);
    

    const [isUser, setIsUser] = useState(Boolean)

    const dispatch = useDispatch()




    useEffect(() => {
      setIsUser(true)
      dispatch(fetchRooms() as any)
    }, [dispatch])
 
    
    

  return (
    <div>
        <ul>
        
      {loading ? (
  <p>Loading...</p>
) : (
  <ul>
    {items?.map((room) => (
      <li key={room.id} style={{border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px'}}>
        <Link href={`/screens/Book/${room.id}`}>
        
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          {room.image_Url && (
            <img
              src={room.image_Url}
              alt={`${room.name} image`}
              width={100}
              height={100}
              style={{objectFit: 'cover', borderRadius: '8px'}}
            />
          )}
          <div>
            <h3>{room.name}</h3>
            <p>Capacity: {room.capacity} people</p>
            <p>Charge: ${room.charge}/hr</p>
            <p>Square Feet: {room.square} sq ft</p>
            <p>Location: {room.location}</p>
            <p>Address: {room.address}</p>
            {room.discription && <p>Description: {room.discription}</p>}
          </div>
        </div>
        </Link>
      </li>
    ))}
  </ul>
)}
      </ul>
    </div>
  )
}

export default Page