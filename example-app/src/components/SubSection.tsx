'use client'

import React from 'react'
import { ReactNode, useMemo, useState } from 'react'
import ReactButton from './Buttons/ReactButton'
import JavascriptButton from './Buttons/JavascriptButton'

export type Technology = 'react' | 'javascript'

export default function HomeSection({
  title,
  description,
  getStarted,
  rightColumn
}: {
  title: string
  description: string
  getStarted: {
    href: string
    label: string
  }
  rightColumn: (type: Technology) => React.ReactElement
}) {
  const [selected, setSelected] = React.useState<Technology>('react')

  const memoizedRightColumn = React.useMemo(() => {
    return rightColumn(selected)
  }, [selected])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <ReactButton
              selected={selected === 'react'}
              onClick={() => setSelected('react')}
            />
            <JavascriptButton
              selected={selected === 'javascript'}
              onClick={() => setSelected('javascript')}
            />
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p>{description}</p>
        <p>
          <a
            className="border border-slate-400 rounded-md px-2 py-1 text-slate-800 hover:bg-slate-300 transition-colors"
            href={getStarted.href}
          >
            View on npm ↗
          </a>
        </p>
      </div>
      <div className="space-y-6 w-full">{memoizedRightColumn}</div>
    </div>
  )
}
