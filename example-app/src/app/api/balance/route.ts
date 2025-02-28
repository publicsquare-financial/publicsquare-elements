import { NextRequest, NextResponse } from 'next/server'

const headers = {
  Authorization: `${process.env.CHIRP_API_TOKEN}`,
  'Content-Type': 'application/json'
}

type GetBankInfoProps = {
  requestCode: string
}

function getBankInfo(props: GetBankInfoProps) {
  return fetch(
    `https://chirp.digital/api/getRequestAccountDetails/${props.requestCode}`,
    {
      method: 'GET',
      headers
    }
  ).then((res) => res.json())
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const requestCode = searchParams.get('requestCode')
  if (!requestCode) {
    return NextResponse.json(
      { error: 'Request code is required' },
      { status: 400 }
    )
  }
  const bankInfo = await getBankInfo({ requestCode })
  return NextResponse.json(bankInfo)
}
