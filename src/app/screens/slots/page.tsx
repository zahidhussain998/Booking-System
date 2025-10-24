"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchRooms } from "../../store/userSlice";
import Link from "next/link";

function Page() {
  const { items, loading } = useSelector((state: RootState) => state.user);
  const [isUser, setIsUser] = useState(Boolean);
  const dispatch = useDispatch();

  useEffect(() => { // why we use here the useeffect what;s benifit of it mean when the component of this slots mount it should fetch all the rooms 
      //dependency will be the disptach because data gonna changing siminstially
    setIsUser(true);
    dispatch(fetchRooms() as any);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-yellow-400 border-t-black rounded-full animate-spin"></div>
              <div className="text-center mt-6">
                <p className="text-black font-medium">Loading premium spaces...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {items?.map((room) => (
              <div key={room.id} className="group relative">
                <div className="relative overflow-hidden border border-black rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 bg-white">
                  <div className="relative p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Image */}
                      <div className="lg:col-span-3">
                        {room.image_Url && (
                          <div className="relative overflow-hidden rounded-xl">
                            <img
                              src={room.image_Url}
                              alt={`${room.name} image`}
                              className="w-full h-32 lg:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/10"></div>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="lg:col-span-6">
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-black">
                            {room.name}
                          </h3>

                          {room.discription && (
                            <div className="border-l-4 border-yellow-400 pl-4">
                              <p className="text-black">{room.discription}</p>
                            </div>
                          )}

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                            <div className="text-center p-3 border border-black rounded-lg">
                              <div className="text-xl font-bold text-black">
                                {room.capacity}
                              </div>
                              <div className="text-xs text-yellow-600 uppercase tracking-wide">
                                People
                              </div>
                            </div>

                            <div className="text-center p-3 border border-black rounded-lg">
                              <div className="text-xl font-bold text-black">
                                {room.square}
                              </div>
                              <div className="text-xs text-yellow-600 uppercase tracking-wide">
                                Sq Ft
                              </div>
                            </div>

                            <div className="col-span-2 text-center p-3 border border-black rounded-lg">
                              <div className="text-sm font-medium text-black">
                                {room.location}
                              </div>
                              <div className="text-xs text-yellow-600">
                                {room.address}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="lg:col-span-3">
                        <div className="text-center lg:text-right space-y-10">
                          <div className="p-6 border border-black rounded-xl">
                            <div className="text-3xl font-bold text-black mb-1">
                              ${room.charge}
                            </div>
                            <div className="text-sm text-yellow-600 font-medium">
                              per hour
                            </div>
                          </div>

                          <Link
                            className="w-full px-8 py-4 border-2 mt-5 border-black text-black font-semibold rounded-xl transition-all duration-300 hover:bg-yellow-400 hover:text-black"
                            href={`/screens/Book/${room.id}`}
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && (!items || items.length === 0) && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="w-12 h-12 bg-yellow-400 rounded-xl"></div>
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">
              No Rooms Available
            </h3>
            <p className="text-yellow-600">
              Check back later for premium meeting spaces.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-black">
          <p className="text-yellow-600">
            Premium meeting spaces for professional teams
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
