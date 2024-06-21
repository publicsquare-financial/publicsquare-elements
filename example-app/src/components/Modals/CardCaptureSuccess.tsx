import { ReactNode, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

type Props = {
  message?: object
  onClose: () => void
}

export default function CardCaptureSuccess({ message, onClose }: Props) {
  return (
    <Dialog className="relative z-10" open={!!message} onClose={onClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Card capture successful
                </DialogTitle>
                <div className="mt-2 text-left space-y-1">
                  <p>Response data:</p>
                  {message &&
                    Object.entries(message).map(([key, value], i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center"
                      >
                        <b>{key}</b>
                        <div className="mx-4 flex-grow border-4 border-b border-dotted border-gray-100" />
                        <span className="text-gray-700 text-sm">{value}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => onClose()}
              >
                Go back to examples
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
