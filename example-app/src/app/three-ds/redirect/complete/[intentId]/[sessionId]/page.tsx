'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type Status = 'completing' | 'done' | 'error'

export default function RedirectCompletePage() {
  const params = useParams<{ intentId: string; sessionId: string }>()
  const [status, setStatus] = useState<Status>('completing')
  const [result, setResult] = useState<{ status?: string; [key: string]: unknown }>()
  const [error, setError] = useState<string>()
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const { intentId, sessionId } = params
    fetch(`/api/payment-intents/${intentId}/three_d_secure/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ three_d_secure: { session_id: sessionId } }),
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) {
          setError(JSON.stringify(data))
          setStatus('error')
          return
        }
        setResult(data)
        setStatus('done')
      })
      .catch((err) => {
        setError(String(err))
        setStatus('error')
      })
  }, [params])

  return (
    <div className="container mx-auto py-8 space-y-4 max-w-xl">
      <h2 className="text-xl font-semibold">3DS Redirect — Complete</h2>
      <p className="text-sm text-slate-600">
        Returned from the ACS challenge. Intent <code>{params.intentId}</code>, session{' '}
        <code>{params.sessionId}</code>.
      </p>

      {status === 'completing' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700 text-sm">
          Completing 3DS challenge…
        </div>
      )}

      {status === 'done' && result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="font-semibold text-green-800 mb-2">
            Flow complete — status: <code>{result.status}</code>
          </div>
          <pre className="text-xs overflow-x-auto whitespace-pre-wrap break-all">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          <b>Error:</b> {error}
        </div>
      )}

      <Link
        href="/three-ds"
        className="inline-block rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500"
      >
        Back to 3DS
      </Link>
    </div>
  )
}
