import React, { useEffect, useRef, useState } from 'react'
import { useCredova } from '../core/CredovaProvider'
import { ElementType } from '@credova/elements-js/dist/types/sdk'

type ElementProps = {
  id: string
  type: ElementType
}

export default function Element({ id, type }: ElementProps) {
  const [elementId, setElementId] = useState(id)
  const { credova, createElement } = useCredova()
  const elementRef = useRef<HTMLDivElement>(null)
  const [element, setElement] = useState()

  useEffect(() => {
    if (credova && !element) {
      // createElement()
    }
  }, [credova, element])

  return <div id={elementId} ref={elementRef} />
}
