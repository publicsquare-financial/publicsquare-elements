'use client'

import { useState } from 'react'
import ThreeDSElementsJs from '@/components/ThreeDSElements/ThreeDSElementsJs'
import IFrameFlow from '@/components/ThreeDSElements/IFrameFlow'
import RedirectFlow from '@/components/ThreeDSElements/RedirectFlow'
import { ThreeDsProvider } from '@/components/ThreeDSElements/ThreeDSElementsReact'
import { Technology } from './HomeSection'

type FlowTab = 'iframe' | 'redirect'

function TabButton({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
        active
          ? 'bg-indigo-600 text-white shadow-sm'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      }`}
    >
      {label}
    </button>
  )
}

export default function ThreeDSFormColumn({
  type,
  allInOne,
}: {
  type: Technology
  allInOne: boolean
}) {
  const [flow, setFlow] = useState<FlowTab>('iframe')

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <h3 className="text-lg font-medium">3DS Challenge Form</h3>
      <p className="text-sm">This is a form for the 3D Secure challenge flow.</p>

      <div className="flex gap-2">
        <TabButton active={flow === 'iframe'} label="Iframe" onClick={() => setFlow('iframe')} />
        <TabButton
          active={flow === 'redirect'}
          label="Redirect"
          onClick={() => setFlow('redirect')}
        />
      </div>

      {type === 'react' && (
        <ThreeDsProvider>
          {flow === 'iframe' ? (
            <IFrameFlow allInOne={allInOne} />
          ) : (
            <RedirectFlow allInOne={allInOne} />
          )}
        </ThreeDsProvider>
      )}
      {type === 'javascript' && <ThreeDSElementsJs flow={flow} allInOne={allInOne} />}
    </div>
  )
}
