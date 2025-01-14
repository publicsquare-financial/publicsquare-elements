export type InputElementOptions = {
  placeholder?: string
  value?: string
  className?: string
}

export type PSQTextElement = {
  el: HTMLInputElement
  mount: (id: string) => void
}
