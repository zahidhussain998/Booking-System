import { Resend } from 'resend'

import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req:NextRequest) {
  try {
    const {email, firstName, room, date} = await req.json()

    if(!email){
      return NextResponse.json({error:"email required"}, {status:400})
    }

    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not set')
      return NextResponse.json({error:"RESEND_API_KEY not configured"}, {status:500})
    }

    const text = `Booking Confirmation

Dear ${firstName},

Your booking has been confirmed.

Room: ${room}
Date: ${date}
Email: ${email}

Thank you for choosing our service!`

console.log(room)
console.log(date)
console.log(email)
console.log(firstName)

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: "zahidzahidhusssain@gmail.com",
      subject: 'Booking Confirmation',
      text,
    });

    if (error) {
      console.log('Resend error:', error)
      return NextResponse.json(error, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (error) {
    console.log('Catch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
