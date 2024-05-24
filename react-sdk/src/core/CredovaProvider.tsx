import React, { PropsWithChildren, createContext, useContext } from 'react'
import {
  BasisTheoryProvider,
  useBasisTheory
} from '@basis-theory/basis-theory-react'

type CredovaProviderValue = {}

const CredovaContext = createContext<CredovaProviderValue>({})

type CredovaProviderProps = {
  apiKey?: string
}

export const CredovaProvider = ({
  children,
  apiKey = 'api_key'
}: PropsWithChildren<CredovaProviderProps>) => {
  const { bt } = useBasisTheory(apiKey, { elements: true })
  return (
    <BasisTheoryProvider bt={bt}>
      <CredovaContext.Provider value={{}}>{children}</CredovaContext.Provider>
    </BasisTheoryProvider>
  )
}

export const useCredova = (): CredovaProviderValue => useContext(CredovaContext)
