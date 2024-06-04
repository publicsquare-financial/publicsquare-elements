export type CardsCreateInput = {
  card: {
    number: string
    expirationMonth: string
    expirationYear: string
    cvc: string
  }
}

export type ValidatedCardsCreateInput = {
  validated: CardsCreateInput
}
