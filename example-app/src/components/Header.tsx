'use client'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import cx from 'classnames'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/publicsquare-payments-logo.svg"
              alt="PublicSquare Logo"
              width={200}
              height={20}
              priority
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/debit-credit-cards"
            className={cx(
              'text-sm/6 font-semibold',
              pathname === '/debit-credit-cards'
                ? 'text-indigo-500 border-b-2 border-indigo-500'
                : 'text-gray-900 border-b-2 border-transparent'
            )}
          >
            Debit/Credit Cards
          </Link>
          <Link
            href="/bank-accounts"
            className={cx(
              'text-sm/6 font-semibold',
              pathname === '/bank-accounts'
                ? 'text-indigo-500 border-b-2 border-indigo-500'
                : 'text-gray-900 border-b-2 border-transparent'
            )}
          >
            Bank Accounts
          </Link>
          <Link
            href="/bank-verification"
            className={cx(
              'text-sm/6 font-semibold',
              pathname === '/bank-verification'
                ? 'text-indigo-500 border-b-2 border-indigo-500'
                : 'text-gray-900 border-b-2 border-transparent'
            )}
          >
            Verify Bank Accounts
          </Link>
          <Link
            href="/apple-pay"
            className={cx(
              'text-sm/6 font-semibold',
              pathname === '/apple-pay'
                ? 'text-indigo-500 border-b-2 border-indigo-500'
                : 'text-gray-900 border-b-2 border-transparent'
            )}
          >
            Apple Pay
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="https://developers.publicsquare.com"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Documentation <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/publicsquare-payments-logo.svg"
                alt="PublicSquare Logo"
                width={200}
                height={20}
                priority
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/debit-credit-cards"
                  className={cx(
                    '-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold',
                    pathname === '/debit-credit-cards'
                      ? 'text-indigo-500 border-b-2 border-indigo-500'
                      : 'text-gray-900 border-b-2 border-transparent'
                  )}
                >
                  Debit/Credit Cards
                </Link>
                <Link
                  href="/bank-accounts"
                  className={cx(
                    '-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold',
                    pathname === '/bank-accounts'
                      ? 'text-indigo-500 border-b-2 border-indigo-500'
                      : 'text-gray-900 border-b-2 border-transparent'
                  )}
                >
                  Bank Accounts
                </Link>
                <Link
                  href="/apple-pay"
                  className={cx(
                    '-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold',
                    pathname === '/apple-pay'
                      ? 'text-indigo-500 border-b-2 border-indigo-500'
                      : 'text-gray-900 border-b-2 border-transparent'
                  )}
                >
                  Apple Pay
                </Link>
              </div>
              <div className="py-6">
                <Link
                  href="https://developers.publicsquare.com"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Documentation
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
