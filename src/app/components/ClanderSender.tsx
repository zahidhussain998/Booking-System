export function GoogleCalendarButton({ room, selectedDateTime, onSuccess }) {
  const addToCalendar = () => {
    if (!room || !selectedDateTime) return;

    const checkIn = selectedDateTime.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const checkOut = new Date(selectedDateTime.getTime() + 3600000)
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${
      encodeURIComponent(room.name)
    }&dates=${checkIn}/${checkOut}&details=Booking%20Confirmed`;

    window.open(url, "_blank");

    onSuccess?.();
  };

  return (
    <button onClick={addToCalendar} className="bg-yellow-500 px-4 py-2 rounded-lg">
      Add to Google Calendar
    </button>
  );
}
