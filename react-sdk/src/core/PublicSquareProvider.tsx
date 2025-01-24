import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { PublicSquare } from '@publicsquare/elements-js'
import * as Types from '../types'

const PublicSquareContext = createContext<Types.PublicSquareProviderValue>(
  {} as any
)

export const PublicSquareProvider = ({
  children,
  apiKey,
  options
}: PropsWithChildren<Types.PublicSquareProviderProps>) => {
  const [publicsquare, setPublicSquare] = useState<PublicSquare>()

  let init = false
  useEffect(() => {
    if (!init) {
      new PublicSquare().init(apiKey, options).then((_publicsquare) => {
        setPublicSquare(_publicsquare)
      })
    }
  }, [])

  const createElement: Types.PublicSquareProviderValue['createElement'] = (
    ...args
  ) => publicsquare!.createElement(...args)

  return (
    <PublicSquareContext.Provider
      value={{
        publicsquare,
        createElement
      }}
    >
      {children}
    </PublicSquareContext.Provider>
  )
}

export const usePublicSquare = (): Types.PublicSquareProviderValue =>
  useContext(PublicSquareContext)
