'use client'

import { Technology } from './HomeSection'
import ApplePayElementsJs from './ApplePayElements/ApplePayElementsJs'
import ApplePayElementsReact from './ApplePayElements/ApplePayElementsReact'


export default function ApplePayFormColumn({
  type
}: {
  type: Technology
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <h3 className="text-lg font-medium">Apple Pay</h3>
      <p className="text-sm">This is the Apple Pay button.</p>
      {type === 'react' && <ApplePayElementsReact />}
      {type === 'javascript' && <ApplePayElementsJs />}
    </div>
  )
}
