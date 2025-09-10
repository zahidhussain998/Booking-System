"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/app/lib/Supabase";

interface Booking {
  id: string;
  name: string;
  check_in: string;
  check_out: string;
  status: string;
  user_id: string;
  room_id: string;
}

function Booked() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .eq("user_id", user.id)

        if (error) {
          console.error("❌ Error fetching bookings:", error.message);
        } else {
          setBookings(data || []);
        }
      };

      fetchBookings();
    }
  }, [user]);

const handleCancle = async (bookedId:string) => {

    const {data, error} = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookedId)

    setBookings((prev) => prev.filter((b) => b.id != bookedId))




    if(error){
        return error
    }

}

 console.log(user)

   return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📅 Your Bookings
      </h2>


<>

{user && (
  <>


{bookings.length === 0 ? (
  <p className="text-gray-500 text-center">No bookings yet.</p>
) : (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {bookings.map((item) => (
      <div
        key={item.id}
        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-blue-600 mb-3">
          {item.name || "Unnamed Room"}
        </h3>
        <p className="text-gray-700">
          <span className="font-medium">Check-In:</span>{" "}
          {new Date(item.check_in).toLocaleString()}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Check-Out:</span>{" "}
          {new Date(item.check_out).toLocaleString()}
        </p>
        <p
          className={`mt-3 inline-block px-3 py-1 text-sm rounded-full ${
            item.status === "confirmed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {item.status}
        </p>

        {/* ✅ Pass item.id when clicking */}
        <button
          onClick={() => handleCancle(item.id)}
          className="border cursor-pointer border-red-500 text-red-600 rounded-xl px-4 py-2 mt-4 hover:bg-red-50 transition"
        >
          Cancel
        </button>
      </div>
    ))}
  </div>
)}
</>
)}

</>
      

    </div>
  );
}
export default Booked;
