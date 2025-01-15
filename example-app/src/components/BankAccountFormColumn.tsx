'use client'

import CardElementsJs from '@/components/CardElements/CardElementsJs'
import { Technology } from './HomeSection'
import ACHElementsJs from '@/components/ACHElements/ACHElementsJs'

export default function BankAccountFormColumn({
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
      {type === 'react' && <ACHElementsJs allInOne={allInOne} />}
      {type === 'javascript' && <CardElementsJs allInOne={allInOne} />}
    </div>
  )
}
