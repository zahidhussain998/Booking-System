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
    <div className="min-h-screen bg-white mt-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
              <p className="text-black text-lg">Loading room details...</p>
            </div>
          </div>
        ) : selectedRoom ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-black">
            
            {/* Header */}
            <div className="relative px-8 py-6 border-b border-black">
              <div className="flex items-center space-x-4">
                <div className="w-1 h-12 bg-yellow-500 rounded-full"></div>
                <div>
                  <h1 className="text-3xl font-bold text-black tracking-tight">
                    {selectedRoom?.name}
                  </h1>
                  <div className="flex items-center mt-2">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                      Available for Booking
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              
              {/* Left Column */}
              <div className="space-y-6">
                
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3 flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    Room Description
                  </h3>
                  <p className="text-black">{selectedRoom?.discription}</p>
                </div>

                {/* Image */}
                {selectedRoom.image_Url && (
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3 flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      Room Preview
                    </h3>
                    <div className="relative overflow-hidden rounded-xl border border-black shadow-md">
                      <img
                        src={selectedRoom.image_Url}
                        alt={`${selectedRoom.name} image`}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                  </div>
                )}

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3 flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    Room Features
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["High-Speed WiFi", "Air Conditioning", "Projector", "Whiteboard"].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 border border-black rounded-lg"
                      >
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-black">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Booking Header */}
                <div className="mb-6 text-center">
                  <p className="text-2xl font-bold text-black mb-2 flex items-center justify-center">
                    Book Your Slots
                  </p>
                  <p className="text-black">Select your preferred date and time</p>
                </div>

                {/* Calendar */}
                <div className=" ">
                  <Clendar />
                </div>

                {/* Booking Info */}
                <div className="mt-6 p-4 bg-yellow-100 rounded-xl border-l-4 border-yellow-500 ">
                  <h4 className="text-sm font-medium text-black">Booking Information</h4>
                  <p className="text-sm text-black mt-1">
                    Select a date to view available time slots. All bookings are subject to availability.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="border-t border-black bg-yellow-50 px-8 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-black font-medium">Room ID: #{selectedRoom.id}</span>
                <button className="px-6 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-black hover:text-yellow-400 transition-all duration-200 shadow-md">
                  Need Help?
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-96">
            <div className="text-center p-8 bg-white rounded-2xl shadow-md border border-black">
              <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Room Not Found</h3>
              <p className="text-black">The requested room could not be found.</p>
              <button className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-black hover:text-yellow-400 transition-colors">
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
