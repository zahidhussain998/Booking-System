/* eslint-disable react-hooks/rules-of-hooks */
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../lib/stripe'
import supabase from '@/app/lib/Supabase'

export async function POST(request: NextRequest) {
      
const url = new URL(request.url)
const roomId = url.searchParams.get('roomId')
const checkIn = url.searchParams.get('checkIn')
const price = url.searchParams.get('price')
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Get roomId from URL search params


    if (!roomId) {
      return NextResponse.json(
        { error: 'Room ID is required' },
        { status: 400 }
      )
    }



    // Fetch room data directly from Supabase
    const { data: room, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', parseInt(roomId))
      .single()

    if (error || !room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      )
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: room.name,
              description: room.discription || room.description
            },
            unit_amount: Math.round(room.charge * 100)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/screens/slots?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
     metadata: {
  room_id: roomId,
  check_in: checkIn,
  price: price,
}

    });

    return NextResponse.redirect(session.url!, 303)
  } catch (err: any) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: err.statusCode || 500 }
    )
  }
}
