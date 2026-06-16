'use client'

import HomeSection from '@/components/HomeSection'
import ThreeDSFormColumn from '@/components/ThreeDSFormColumn'

export default function Page() {
  return (
    <div className="container mx-auto">
      <HomeSection
        title="3DS Challenge Element"
        description="This example shows how the PublicSquare 3DS Challenge Element works. Fill in the card details and 3DS parameters, then click 'Create card' to initiate the challenge flow."
        getStarted={{
          href: 'https://www.npmjs.com/package/@publicsquare/elements-js',
          label: 'Get Started'
        }}
        rightColumn={(type, allInOne) => (
          <ThreeDSFormColumn type={type} allInOne={allInOne} />
        )}
      />
    </div>
  )
}
