'use client'

import HomeSection from '@/components/HomeSection'
import DebitCreditFormColumn from '@/components/DebitCreditFormColumn'

export default function Page() {
  return (
    <div className="container mx-auto">
      <HomeSection
        title="Debit/Credit Card Element"
        description="This example shows how the PublicSquare Card Elements Javascript SDK looks."
        getStarted={{
          href: 'https://www.npmjs.com/package/@publicsquare/elements-js',
          label: 'Get Started'
        }}
        rightColumn={(type, allInOne) => (
          <DebitCreditFormColumn type={type} allInOne={allInOne} />
        )}
      />
    </div>
  )
}
