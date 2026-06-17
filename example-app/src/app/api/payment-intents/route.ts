import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secretKey = process.env.PSQ_SECRET_KEY
  const baseUrl = process.env.API_BASE_URL ?? 'https://api.publicsquare.com'

  if (!secretKey) {
    return NextResponse.json(
      { error: 'PSQ_SECRET_KEY is not configured' },
      { status: 500 }
    )
  }

  const body = await request.json()

  const upstream = await fetch(`${baseUrl}/payment-intents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': secretKey,
    },
    body: JSON.stringify(body),
  })

  const data = await upstream.json()
  return NextResponse.json(data, { status: upstream.status })
}
