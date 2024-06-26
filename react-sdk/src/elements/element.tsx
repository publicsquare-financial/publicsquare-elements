import React, { forwardRef, useEffect, useState } from 'react'
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

const CredovaElement = forwardRef<any, ElementProps>(function Component(
  { id, type, options = {} },
  ref
) {
  const [elementId, setElementId] = useState(id)
  const { credova, createElement } = useCredova()
  const [element, setElement] = useState()

  function setRef(element: ReturnType<typeof createElement>) {
    if (typeof ref === 'function') {
      ref(element)
    } else if (ref) {
      ref.current = element
    }
  }

  let init = false
  useEffect(() => {
    if (!init && credova && !element) {
      init = true
      const element = createElement(type, options)
      element.mount(`#${id}`)
      setRef(element)
    }
  }, [credova, element])

  if (!id || !type || !ref) {
    console.error(`Credova element requires an id, type, & ref!`)
    return null
  } else {
    return <div id={elementId} />
  }
})

export default CredovaElement
