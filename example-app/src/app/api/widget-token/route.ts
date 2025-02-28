import { NextResponse } from 'next/server'

const headers = {
  Authorization: `${process.env.CHIRP_API_TOKEN}`,
  'Content-Type': 'application/json'
}

type CreateRequestCodeBody = {
  cusFirstName: string
  cusLastName: string
  cusEmail: string
  cusAccType: string
  cusPhone: string
}

function createRequestCode(body: CreateRequestCodeBody) {
  return fetch(`https://chirp.digital/api/createRequest`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
    .then((res) => res.json())
    .then((data) => (data.success ? data.response : data))
}

type CreateRequestTokenBody = {
  requestCode: string
}

function createRequestToken(props: CreateRequestTokenBody) {
  return fetch(
    `https://chirp.digital/api/genAuthTokenForChirpLink/chirpLink/${props.requestCode}`,
    {
      method: 'POST',
      headers
    }
  ).then((res) => res.json())
}

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, accountType } = await req.json()
  const { RequestCode: requestCode, ...response } = await createRequestCode({
    cusFirstName: firstName,
    cusLastName: lastName,
    cusEmail: email,
    cusPhone: phone,
    cusAccType: accountType
  })
  console.log('> response', response)
  if (!requestCode) {
    return NextResponse.json(
      { error: 'Failed to create request code' },
      { status: 500 }
    )
  }
  console.log('> requestCode', requestCode)
  const { token } = await createRequestToken({ requestCode })
  if (!token) {
    return NextResponse.json(
      { error: 'Failed to create request token' },
      { status: 500 }
    )
  }
  return NextResponse.json({ token, requestCode })
}
