export type InputElementOptions = {
  placeholder?: string
  value?: string
  className?: string
  required?: boolean
  pattern?: string
  patternError?: string
  onValidate?: (value: string) => boolean
}

export type PSQTextElement = {
  el: HTMLInputElement
  mount: (id: string) => void
}
