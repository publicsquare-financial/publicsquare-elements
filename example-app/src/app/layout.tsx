import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Script from 'next/script';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PublicSquare Payments Examples',
  description: 'Explore PublicSquare Payments examples',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script src="https://js.publicsquare.com/" />
        <Script src="https://js.basistheory.com/" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
