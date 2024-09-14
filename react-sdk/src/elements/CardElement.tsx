import React, { forwardRef } from 'react'
import PublicSquareElement from './element'
import Types from '@publicsquare/elements-js/types/sdk'

type CardElementProps = {
  id: string;
};

export const CardElement = forwardRef<Types.CardElement, CardElementProps>(
  function Component(props, ref) {
    return <PublicSquareElement type="card" {...props} ref={ref} />
  }
);
