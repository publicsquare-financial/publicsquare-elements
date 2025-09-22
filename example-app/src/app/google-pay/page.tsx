'use client';
import GooglePayFormColumn from '@/components/GooglePayFormColumn';
import SubSection from '@/components/SubSection';

export default function Page() {
  return (
    <div className="container mx-auto">
      <SubSection
        title="Google Pay Element"
        description="This example shows how the PublicSquare Google Pay Elements look and operate."
        getStarted={{
          href: 'https://www.npmjs.com/package/@publicsquare/elements-js',
          label: 'Get Started',
        }}
        rightColumn={(type) => <GooglePayFormColumn type={type} />}
      />
    </div>
  );
}
