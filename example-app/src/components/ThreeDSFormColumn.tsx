'use client'

import ThreeDSElementsJs from '@/components/ThreeDSElements/ThreeDSElementsJs'
import ThreeDSElementsReact from '@/components/ThreeDSElements/ThreeDSElementsReact'
import { Technology } from './HomeSection'

export default function ThreeDSFormColumn({
  type,
  allInOne
}: {
  type: Technology
  allInOne: boolean
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <h3 className="text-lg font-medium">3DS Challenge Form</h3>
      <p className="text-sm">This is a form for 3D Secure challenge flow.</p>
      {type === 'react' && <ThreeDSElementsReact allInOne={allInOne} />}
      {type === 'javascript' && <ThreeDSElementsJs allInOne={allInOne} />}
    </div>
  )
}
