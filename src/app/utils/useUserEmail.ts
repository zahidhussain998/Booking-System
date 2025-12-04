export default async function sendBookingEmail(payload) {
  return fetch("/screens/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
