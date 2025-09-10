"use client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation"; // ✅ use this
import supabase from "../lib/Supabase";
import { RootState } from "../store/store";

 function CalendarComponent () {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(new Date());

  const { items } = useSelector((state: RootState) => state.user);

   






  // ✅ get params using Next.js hook
  const params = useParams();
  const roomId = String(params.id);

  // ✅ find the correct room
  const selectedRoom = items?.find((room) => String(room.id) === roomId);

  const handleColor = (time: Date) => {
    return time.getHours() > 12 ? "text-green-600" : "text-red-600";
  };

  const handleSave = async () => {
    if (!selectedDateTime) {
      alert("Please select a date and time first.");
      return;
    }
    if (!selectedRoom) {
      alert("Room not found!");
      return;
    }

      const { data: { user } } = await supabase.auth.getUser();


    const checkIn = selectedDateTime;
    const checkOut = new Date(selectedDateTime.getTime() + 60 * 60 * 1000);

    // check for existing booking
    const { data: existing } = await supabase
      .from("bookings")
      .select("*")
      .eq("room_id", selectedRoom.id.toString()) // Convert to string if DB expects UUID
      .gte("check_in", checkIn.toISOString())
      .lt("check_out", checkOut.toISOString());

    if (existing && existing.length > 0) {
      alert("This slot is already booked. Please choose another time.");
      return;
    }

    // insert booking ✅ use id not whole object
    // Convert integers to strings if database expects UUID format
    const { data, error } = await supabase.from("bookings").insert([
      {
        
        name:selectedRoom.name,
        room_id: selectedRoom.id.toString(), // Convert to string if DB expects UUID
        user_id: user?.id, // Convert to string if DB expects UUID
        check_in: checkIn.toISOString(),
        check_out: checkOut.toISOString(),
        status: "confirmed",
      },
    ]);

    if (error) {
      console.error(error);
      alert("❌ Error saving booking");
    } else {
      alert("✅ Booking saved successfully!");
      console.log(data);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Book Your Slot</h2>

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
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
      >
        Confirm Booking
      </button>
    </div>
  );
}

export default CalendarComponent;
