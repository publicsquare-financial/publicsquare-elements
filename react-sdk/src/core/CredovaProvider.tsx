import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { Credova } from '@credova/elements-js'
import {
  CreateElementOptions,
  ElementType
} from '@credova/elements-js/dist/types/sdk'

type CredovaProviderValue = {
  credova?: Credova
  createElement(type: ElementType, options: CreateElementOptions): any
}

const CredovaContext = createContext<CredovaProviderValue>({} as any)

type CredovaProviderProps = {
  apiKey?: string
}

export const CredovaProvider = ({
  children,
  apiKey = 'api_key'
}: PropsWithChildren<CredovaProviderProps>) => {
  const [credova, setCredova] = useState<Credova>()

  let init = false
  useEffect(() => {
    if (!init) {
      new Credova()
        .init(process.env.NEXT_PUBLIC_CREDOVA_KEY!)
        .then((_credova) => {
          setCredova(_credova)
        })
    }
  }, [])

  const createElement: CredovaProviderValue['createElement'] = (...args) =>
    credova?.createElement(...args)

  return (
    <CredovaContext.Provider
      value={{
        credova,
        createElement
      }}
    >
      {children}
    </CredovaContext.Provider>
  )
}

export const useCredova = (): CredovaProviderValue => useContext(CredovaContext)
