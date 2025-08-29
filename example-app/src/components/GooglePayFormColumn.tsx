'use client'

import { Technology } from './HomeSection'
import GooglePayElementsJs from './GooglePayElements/GooglePayElementsJs'
import GooglePayElementsReact from './GooglePayElements/GooglePayElementsReact'

export default function GooglePayFormColumn({ type }: { type: Technology }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <h3 className="text-lg font-medium">Google Pay</h3>
      <p className="text-sm">
        Generated Google Pay button from PublicSquare elements.
      </p>
      {type === 'react' && <GooglePayElementsReact />}
      {type === 'javascript' && <GooglePayElementsJs />}
    </div>
  )
}
