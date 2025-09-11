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
  const [finalPrice, setFinalPrice] = useState<number>(0);

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



  // ✅ get params using Next.js hook
  const params = useParams();
  const roomId = String(params.id);

  // ✅ find the correct room
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

    const checkIn = selectedDateTime;
    const checkOut = new Date(selectedDateTime.getTime() + 60 * 60 * 1000);

    // check for existing booking
    const { data: existing } = await supabase
      .from("bookings")
      .select("*")
      .eq("room_id", selectedRoom.id)
      .gte("check_in", checkIn.toISOString())
      .lt("check_out", checkOut.toISOString());

    if (existing && existing.length > 0) {
      alert("This slot is already booked. Please choose another time.");
      return;
    }

    

    // finalPrice is already calculated and stored in state

    const { data: { user } } = await supabase.auth.getUser();

    // insert booking
    const { data, error } = await supabase.from("bookings").insert([
      {
        name: selectedRoom.name,
        room_id: selectedRoom.id, // INTEGER type
        user_id: user?.id, // UUID type
        check_in: checkIn.toISOString(),
        check_out: checkOut.toISOString(),
        status: "confirmed",
        final_price: finalPrice, // DECIMAL type
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

      {finalPrice > 0 && (
        <p className="text-lg font-semibold text-blue-600">
          Price: ${finalPrice}
        </p>
      )}

    </div>
  );
}

export default CalendarComponent;
