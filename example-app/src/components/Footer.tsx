import FooterLink from './FooterLink';

export default function Footer() {
  return (
    <footer className="mx-auto mb-32 grid grid-cols-1 py-8 text-center md:grid-cols-3 lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left">
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
    </footer>
  );
}
