export type InputElementOptions = {
  placeholder?: string
  value?: string
  className?: string
  required?: boolean
}

export type PSQTextElement = {
  el: HTMLInputElement
  mount: (id: string) => void
}
