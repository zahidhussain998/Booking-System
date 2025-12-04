"use client";
import { SetStateAction, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useParams } from "next/navigation"; // ✅ use this
import { RootState } from "../store/store";

import { createClient } from "@supabase/supabase-js";
import DatePickers from "./DatePickers";
import calculatePrice from "./dynamicPrice";
import EmailSender from "./EmailSender";

import sendBookingEmail from "../utils/useUserEmail";
import { GoogleCalendarButton } from "./ClanderSender";
function CalendarComponent() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    new Date()
  );
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const { items } = useSelector((state: RootState) => state.user);

  const userEmail = EmailSender();

  //  get params using Next.js hook
  const params = useParams();
  const roomId = String(params.id);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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
          const calculatedPrice = calculatePrice(
            basePrice,
            checkIn,
            availableSlots,
            totalSlots
          );
          setFinalPrice(calculatedPrice);
        });
    }
  }, [selectedDateTime, selectedRoom]);

  const handleColor = (time: Date) => {
    return time.getHours() > 12 ? "text-green-600" : "text-red-600";
  };

  const handleEmail = async () => {
    if (!userEmail) return;

    await sendBookingEmail({
      email: userEmail,
      firstName: userEmail.split("@")[0],
      room: selectedRoom.name,
      date: selectedDateTime.toLocaleString(),
    });
  };

  return (
    <div className="max-w- mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col  space-y-6">
      <h2 className="text-xl font-bold text-gray-800 ">Book Your Slot</h2>

      <div className="w-full">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Select Date & Time
        </label>
        <DatePickers
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
          handleColor={handleColor}
        />
      </div>

      <form
        className=""
        action={`/screens/checkout_sessions?roomId=${selectedRoom?.id}&checkIn=${selectedDateTime?.toISOString()}&price=${finalPrice}`}
        method="POST"
      >
        {finalPrice > 0 && (
          <p className="border w-20 font-bold font-black mb-5">
            Price: ${finalPrice}
          </p>
        )}
        <section>
          <div className="flex flex-col w-70 space-y-2 ">
            <button
              className=" cursor-pointer bg-yellow-500 text-black px-14 py-2 rounded-lg"
              type="submit"
              role="link"
            >
              pay via stripe
            </button>
          </div>
        </section>
      </form>

      <GoogleCalendarButton
        room={selectedRoom}
        selectedDateTime={selectedDateTime}
        onSuccess={handleEmail}
      />
    </div>
  );
}

export default CalendarComponent;
