'use client'
import {
  PublicSquareProvider
} from '@publicsquare/elements-react'
import { environment } from '@/config/environments'

export default function ThreeDSElementsReact({ allInOne }: { allInOne: boolean }) {
  return (
    <PublicSquareProvider
      apiKey={environment.apiKey}
      options={{ ...environment.card, ...environment.threeDs }}
    >
      <Elements allInOne={allInOne} />
    </PublicSquareProvider>
  )
}

function Elements({ allInOne }: { allInOne: boolean }) {
  

  return (
    <div className="space-y-4 w-full">
     
    </div>
  )
}
