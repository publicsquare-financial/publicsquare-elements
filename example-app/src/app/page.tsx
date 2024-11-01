import Image from 'next/image'
import CardElementsJs from './components/CardElements/CardElementsJs'
import CardElementsReact from './components/CardElements/CardElementsReact'
import Script from 'next/script'
import ReactLogo from '../../public/react.svg'
import FooterLink from '@/components/FooterLink'
import HomeSection from '@/components/HomeSection'
import BankAccountsElementsJs from "@/app/components/BankAccountElements/BankAccountElementsJs";

export default function Home() {
  return (
    <>
      <Script src="https://js.publicsquare.com/" />
      <Script src="https://js.basistheory.com/" />
      <main className="flex min-h-screen flex-col items-center justify-between px-8 md:px-24 divide-y divide-slate-300 w-full max-w-6xl mx-auto">
        <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px] py-8">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/publicsquare-payments-logo.svg"
            alt="PublicSquare Logo"
            width={300}
            height={37}
            priority
          />
        </div>
        <HomeSection
          title="PublicSquare Card Elements (JS)"
          description="This example shows how the PublicSquare Card Elements Javascript SDK looks."
          getStarted={{
            href: 'https://www.npmjs.com/package/@publicsquare/elements-js',
            label: 'Get Started'
          }}
          badge={
            <div className="space-x-2 bg-yellow-300 px-2 rounded-md inline-flex items-center">
              <span className="font-bold font-sans">JS</span>
              <span className="italic text-yellow-700 text-sm">Javascript</span>
            </div>
          }
          rightColumn={<CardElementsJs />}
        />
        <HomeSection
          title="PublicSquare Card Elements (React)"
          description="This example demonstrates how to use the PublicSquare Card Elements with the React SDK."
          getStarted={{
            href: 'https://www.npmjs.com/package/@publicsquare/elements-react',
            label: 'Get Started'
          }}
          badge={
            <div className="space-x-2 bg-cyan-300 px-2 rounded-md inline-flex items-center">
              <span
                className="font-bold font-sans inline-flex items-center"
                style={{ height: 24 }}
              >
                <Image
                  src={ReactLogo}
                  alt="React Logo"
                  width={20}
                  height={20}
                />
              </span>
              <span className="italic text-cyan-700 text-sm">React</span>
            </div>
          }
          rightColumn={<CardElementsReact />}
        />
        <HomeSection
          title="PublicSquare Bank Account Elements (JS)"
          description="This example demonstrates how to use the PublicSquare Bank Account Elements with the Javascript SDK."
          getStarted={{
            href: 'https://www.npmjs.com/package/@publicsquare/elements-js',
            label: 'Get Started'
          }}
          badge={
            <div className="space-x-2 bg-yellow-300 px-2 rounded-md inline-flex items-center">
              <span className="font-bold font-sans">JS</span>
              <span className="italic text-yellow-700 text-sm">Javascript</span>
            </div>
          }
          rightColumn={<BankAccountsElementsJs />}
        />
        <div className="mb-32 grid grid-cols-1 md:grid-cols-3 text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left py-8">
          <FooterLink
            label="Docs"
            href="https://developers.publicsquare.com"
            description="Find in-depth information about PublicSquare features and SDK."
          />
          <FooterLink
            label="JS SDK"
            href="https://www.npmjs.com/package/@publicsquare/elements-js"
            description="View and download the PublicSquare JS SDK."
          />
          <FooterLink
            label="React SDK"
            href="https://www.npmjs.com/package/@publicsquare/elements-react"
            description="View and download the PublicSquare React SDK."
          />
        </div>
      </main>
    </>
  )
}
