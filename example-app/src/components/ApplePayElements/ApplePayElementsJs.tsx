'use client'

import { PublicSquare } from "@publicsquare/elements-js"
import { PublicSquareInitOptions } from "@publicsquare/elements-js/types"
import { useEffect, useState } from "react"

export default function ApplePayElementsJs() {
  const [publicsquare, setPublicSquare] = useState<PublicSquare>()
  
  useEffect(() => {
    /**
     * Step 1: Init the PublicSquare sdk
     */
    const apiKey = process.env.NEXT_PUBLIC_PUBLICSQUARE_KEY!
    const options: PublicSquareInitOptions = {}

    new PublicSquare()
      .init(apiKey, options)
      .then((_publicsquare) => setPublicSquare(_publicsquare))
  }, [])

    return (
    <div className="space-y-4 w-full"></div>
    )
}