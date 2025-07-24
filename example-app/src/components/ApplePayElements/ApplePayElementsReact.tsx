'use client'
import {
  PublicSquareProvider
} from '@publicsquare/elements-react'
import PublicSquareTypes, {
  PublicSquareInitOptions
} from '@publicsquare/elements-react/types/sdk'

export default function ApplePayElementsReact() {
  const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
  const options: PublicSquareInitOptions = {}

  return (
    <PublicSquareProvider apiKey={apiKey} options={options}>
      <Elements />
    </PublicSquareProvider>
  )
}

function Elements() {
 
  return (
    <div className="space-y-4 w-full">
      
    </div>
  )
}