import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { Credova as PublicSquare } from '@credova/elements-js'
import {
  CreateElementOptions,
  CredovaInitOptions as PublicSquareInitOptions,
  ElementType
} from '@credova/elements-js/types/sdk'

type PublicSquareProviderValue = {
  publicsquare?: PublicSquare;
  createElement(
    type: ElementType,
    options: CreateElementOptions
  ): ReturnType<InstanceType<typeof PublicSquare>['createElement']>;
};

const PublicSquareContext = createContext<PublicSquareProviderValue>({} as any);

type PublicSquareProviderProps = {
  apiKey: string
  options?: PublicSquareInitOptions,
};

export const PublicSquareProvider = ({
  children,
  apiKey,
  options,
}: PropsWithChildren<PublicSquareProviderProps>) => {
  const [publicsquare, setPublicSquare] = useState<PublicSquare>()

  let init = false;
  useEffect(() => {
    if (!init) {
      new PublicSquare().init(apiKey, options).then((_publicsquare) => {
        setPublicSquare(_publicsquare);
      });
    }
  }, []);

  const createElement: PublicSquareProviderValue['createElement'] = (...args) =>
    publicsquare!.createElement(...args);

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

export const usePublicSquare = (): PublicSquareProviderValue => useContext(PublicSquareContext)
