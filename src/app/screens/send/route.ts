
import { Resend } from 'resend'

import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export async function POST(req:NextRequest) {
  try {
    const {email, firstName, room, date} = await req.json()

    if(!email){
      return NextResponse.json({error:"email required"}, {status:400})
    }

    if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
      console.log('NEXT_PUBLIC_RESEND_API_KEY not set')
      return NextResponse.json({error:"NEXT_PUBLIC_RESEND_API_KEY not configured"}, {status:500})
    }

    const text = `Booking Confirmation

Dear ${firstName},

Your booking has been confirmed.

Room: ${room}
Date: ${date}
Email: ${email}

Thank you for choosing our service!`

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ["zahidzahidhusssain@gmail.com"],
      subject: 'Booking Confirmation',
      text,
    });

    if (error) {
      console.log('Resend error:', error)
      return Response.json(error, { status: 500 })
    }
    return Response.json(data)
  } catch (error) {
    console.log('Catch error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
