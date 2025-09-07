"use client"
import { RootState } from '@/app/store/store'
import { fetchRooms } from '@/app/store/userSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Clendar from '@/app/components/Clander'
import { useParams } from 'next/navigation'

function Page() {
  const { items, loading } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const paramss = useParams()
  const roodId = parseInt(paramss.id as string)

  const selectedRoom = items?.find((room) => room.id === roodId)

  useEffect(() => {
    dispatch(fetchRooms() as any)
  }, [dispatch])

  return (
    <>
    
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 text-lg animate-pulse">Loading...</p>
        </div>
      ) : selectedRoom ? (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image */}
          {selectedRoom.image_Url && (
            <img
              src={selectedRoom.image_Url}
              alt={`${selectedRoom.name} image`}
              className="w-full h-72 object-cover"
            />
          )}

          {/* Room Details */}
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{selectedRoom?.name}</h1>
            <p className="text-gray-600">{selectedRoom?.discription}</p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-100 p-4 rounded-xl">
                <h2 className="text-sm font-semibold text-gray-500">Address</h2>
                <p className="text-gray-700">{selectedRoom?.address}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <h2 className="text-sm font-semibold text-gray-500">Location</h2>
                <p className="text-gray-700">{selectedRoom?.location}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <h2 className="text-sm font-semibold text-gray-500">Capacity</h2>
                <p className="text-gray-700">{selectedRoom?.capacity} people</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <h2 className="text-sm font-semibold text-gray-500">Charge</h2>
                <p className="text-gray-700">${selectedRoom?.charge} / hour</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <h2 className="text-sm font-semibold text-gray-500">Availability</h2>
                <p className="text-gray-700">{selectedRoom?.avaliblity}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <h2 className="text-sm font-semibold text-gray-500">Square Feet</h2>
                <p className="text-gray-700">{selectedRoom?.square} ft²</p>
              </div>
            </div>

            {/* Calendar */}
          </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Book Your Slot</h2>
            </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 text-lg">Page not found</p>
        </div>
      )}
    </div>
                  <Clendar />

    </>
  )
}

export default Page
