'use client'
import { useEffect } from 'react'
import { PSQPay } from '@psq-pay/elements-js'

export default function CardElementJs() {
  useEffect(() => {
    new PSQPay().init('something', {}).then((psq) => {
      const cardElement = psq.createElement('card', {})

      cardElement.mount('#card-element')
    })
  }, [])

  return (
    <div className="w-full max-w-md space-y-2 p-2">
      <h2>Card form</h2>
      <div className="w-full max-w-md bg-white shadow p-2 rounded-lg">
        <div id="card-element"></div>
      </div>
    </div>
  )
}
