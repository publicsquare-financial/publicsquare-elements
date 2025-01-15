'use client'

import CardElementsJs from '@/components/CardElements/CardElementsJs'
import CardElementsReact from '@/components/CardElements/CardElementsReact'
import { Technology } from './HomeSection'

export default function DebitCreditFormColumn({
  type,
  allInOne
}: {
  type: Technology
  allInOne: boolean
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <h3 className="text-lg font-medium">Debit/Credit Card Form</h3>
      <p className="text-sm">This is a form for debit/credit cards.</p>
      {type === 'react' && <CardElementsReact allInOne={allInOne} />}
      {type === 'javascript' && <CardElementsJs allInOne={allInOne} />}
    </div>
  )
}
