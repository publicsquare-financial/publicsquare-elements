'use client';
import BankAccountVerificationFormColumn from '@/components/BankAccountVerificationFormColumn';
import SubSection from '@/components/SubSection';
export default function Page() {
  return (
    <div className="container mx-auto">
      <SubSection
        title="Bank Account Verification Element"
        description="This example shows how the PublicSquare Bank Account Verification Elements look and operate."
        getStarted={{
          href: 'https://www.npmjs.com/package/@publicsquare/elements-js',
          label: 'Get Started',
        }}
        rightColumn={(type) => <BankAccountVerificationFormColumn type={type} />}
      />
    </div>
  );
}
