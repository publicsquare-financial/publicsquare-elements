import React, { useEffect, useRef, useState } from 'react'
import { useCredova } from '../core/CredovaProvider'
import {
  CreateElementOptions,
  ElementType
} from '@credova/elements-js/dist/types/sdk'

type ElementProps = {
  id: string
  type: ElementType
  options?: CreateElementOptions
}

export default function CredovaElement({
  id,
  type,
  options = {}
}: ElementProps) {
  const [elementId, setElementId] = useState(id)
  const { credova, createElement } = useCredova()
  const elementRef = useRef<HTMLDivElement>(null)
  const [element, setElement] = useState()

  let init = false
  useEffect(() => {
    if (!init && credova && !element && elementRef.current) {
      init = true
      const element = createElement(type, options)
      element.mount(`#${id}`)
    }
  }, [credova, element, elementRef.current])

  if (!id || !type) {
    console.error(`Credova element requires both an id and a type specified!`)
    return null
  } else {
    return <div id={elementId} ref={elementRef} />
  }
}
