import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  email: string;
  room: string;
  date: string;
}

export function EmailTemplate({ firstName, email, room, date }: EmailTemplateProps) {
  return (
    <div>
      <h1>Booking Confirmation</h1>
      <p>Dear {firstName},</p>
      <p>Your booking has been confirmed.</p>
      <p><strong>Room:</strong> {room}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Email:</strong> {email}</p>
      <p>Thank you for choosing our service!</p>
    </div>
  );
}
