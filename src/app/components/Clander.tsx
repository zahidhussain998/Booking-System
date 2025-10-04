"use client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation"; // ✅ use this
import supabase from "../lib/Supabase";
import { RootState } from "../store/store";
import SubscribeComponent from "./subcribe/Subcribe-Payment";
import { EmailTemplate } from "./EmailTamplate";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

 function CalendarComponent () {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(new Date());
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [userLog, setUserLog] = useState("")
  const { items } = useSelector((state: RootState) => state.user);

  function calculatePrice(basePrice: number, checkIn: Date, availableSlots: number, totalSlots: number) {
    let price = basePrice;

    // Peak hours (6–9 PM → +20%)
    const hour = checkIn.getHours();
    if (hour >= 18 && hour <= 21) {
      price *= 1.2;
    }

    // Few slots left (< 3 remaining → +30%)
    if (availableSlots < 3) {
      price *= 1.3;
    }

    // Low demand (more than 70% free → -10%)
    if (availableSlots > totalSlots * 0.7) {
      price *= 0.9;
    }

    return Math.round(price);
  }





  //  get params using Next.js hook
  const params = useParams();
  const roomId = String(params.id);

  const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

  //  find the correct room
  const selectedRoom = items?.find((room) => String(room.id) === roomId);

  // Calculate price when selectedDateTime or selectedRoom changes
  useEffect(() => {
    if (selectedDateTime && selectedRoom) {
      const checkIn = selectedDateTime;
      const checkOut = new Date(selectedDateTime.getTime() + 60 * 60 * 1000);

      // Get existing bookings for this time slot
      supabase
        .from("bookings")
        .select("*")
        .eq("room_id", selectedRoom.id)
        .gte("check_in", checkIn.toISOString())
        .lt("check_out", checkOut.toISOString())
        .then(({ data: existing }) => {
          const totalSlots = 10;
          const availableSlots = totalSlots - (existing?.length || 0);
          const basePrice = selectedRoom.charge; // Use charge from room data
          const calculatedPrice = calculatePrice(basePrice, checkIn, availableSlots, totalSlots);
          setFinalPrice(calculatedPrice);
        });
    }
  }, [selectedDateTime, selectedRoom]);

  
useEffect(() => {
  async function getUserEmail() {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      setUserLog(data.user.email); // ✅ actual user email
    } else {
      console.error("No logged in user");
    }
  }
  getUserEmail();
}, []);



  const handleColor = (time: Date) => {
    return time.getHours() > 12 ? "text-green-600" : "text-red-600";
  };
  const addToGoogleCalendar = async () => {
    if (!selectedDateTime || !selectedRoom) return;

    const checkIn = selectedDateTime.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const checkOut = new Date(selectedDateTime.getTime() + 60 * 60 * 1000)
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      selectedRoom.name + ' ' + selectedRoom.discription + ' ' + selectedRoom.created_at
    )}&dates=${checkIn}/${checkOut}&details=Booking%20Confirmed&location=Online`;


    window.open(url, "_blank");

    // Send email after adding to calendar
    const response = await fetch('/screens/send', {
  method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: "zahidzahidhussain@gmail.com", // <-- pass the user’s email directly
      firstName: userLog.split("@")[0],
      room: selectedRoom.name,
      date: selectedDateTime.toLocaleString(),
    }),

    
  })
  
  
  if (response.ok) {
      console.log('Email sent successfully')
    } else {
      console.error('Failed to send email:', response.status)
    }
  } 
  



  return (

    <div className="max-w- mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col  space-y-6">
      <h2 className="text-xl font-bold text-gray-800 ">Book Your Slot</h2>

      <div className="w-full">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Select Date & Time
        </label>
        <DatePicker
          showTimeSelect
          selected={selectedDateTime}
          onChange={(date) => setSelectedDateTime(date)}
          timeClassName={handleColor}
          dateFormat="MMMM d, yyyy h:mm aa"
          className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      


   <form className="" action={`/screens/checkout_sessions?roomId=${selectedRoom?.id}&checkIn=${selectedDateTime?.toISOString()}&price=${finalPrice}`} method="POST">

      {finalPrice > 0 && (
        <p className="border w-20 font-bold font-black mb-5">
          Price: ${finalPrice}
        </p>
      )}
      <section>

        <div className="flex flex-col w-70 space-y-2 ">
        <button className=" cursor-pointer bg-yellow-500 text-black px-14 py-2 rounded-lg" type="submit" role="link">
          pay via stripe
        </button>

        </div>
      </section>
</form>
        
        <button onClick={addToGoogleCalendar} className="cursor-pointer bg-yellow-500 text-black px-4 py-2 rounded-lg">
  Add to Google Calendar
</button>


        





    </div>
  );
}

export default CalendarComponent;
