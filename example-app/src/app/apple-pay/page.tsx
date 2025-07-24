'use client'
import ApplePayFormColumn from '@/components/ApplePayFormColumn'
import HomeSection from '@/components/HomeSection'
import SubSection from '@/components/SubSection'

export default function Page() {
  return (
    <div className="container mx-auto">
      <SubSection
        title="Apple Pay Element"
        description="This example shows how the PublicSquare Apple Pay Elements look and operate."
        getStarted={{
        href: 'https://www.npmjs.com/package/@publicsquare/elements-js',
        label: 'Get Started'
        }}
        rightColumn={(type) => (
          <ApplePayFormColumn type={type} />
        )}
      />
    </div>
  )
}
