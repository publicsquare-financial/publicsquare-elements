import React, { forwardRef } from 'react'
import CredovaElement from './element'
import Types from '@credova/elements-js/dist/types/sdk'

type CardElementProps = {
  id: string;
};

export const CardElement = forwardRef<Types.CardElement, CardElementProps>(
  function Component(props, ref) {
    return <CredovaElement type="card" {...props} ref={ref} />
  }
);
