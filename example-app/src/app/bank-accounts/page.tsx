'use client'
import BankAccountFormColumn from '@/components/BankAccountFormColumn'
import BankAccountVerificationFormColumn from '@/components/BankAccountVerificationFormColumn'
import HomeSection from '@/components/HomeSection'
import SubSection from '@/components/SubSection'

export default function Page() {
  return (
    <div className="container mx-auto">
      <HomeSection
        title="Bank Account Element"
        description="This example shows how the PublicSquare Bank Account Elements look and operate."
        getStarted={{
          href: 'https://www.npmjs.com/package/@publicsquare/elements-js',
          label: 'Get Started'
        }}
        rightColumn={(type, allInOne) => (
          <BankAccountFormColumn type={type} allInOne={allInOne} />
        )}
      />
      <SubSection
        title="Bank Account Verification Element"
        description="This example shows how the PublicSquare Bank Account Verification Elements look and operate."
        getStarted={{
          href: 'https://www.npmjs.com/package/@publicsquare/elements-js',
          label: 'Get Started'
        }}
        rightColumn={(type) => (
          <BankAccountVerificationFormColumn type={type} />
        )}
      />
    </div>
  )
}
