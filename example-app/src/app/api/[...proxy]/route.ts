import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

const handler = async function (req: NextApiRequest, ctx: NextApiResponse) {
  try {
    return fetch(`https://collect-staging.credova.com`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers as object)
      },
      cache: 'no-cache',
      body: JSON.stringify(req.body)
    })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    )
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
