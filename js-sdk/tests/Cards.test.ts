import { Credova, CredovaCards } from '../src'

describe('Credova', () => {
  let credova: Credova
  let cards: CredovaCards
  beforeAll(() => {
    credova = new Credova()
    cards = new CredovaCards(credova)
  })

  test('constructs', () => {
    expect(credova.bt).toBeUndefined()
    expect(typeof credova.init).toEqual('function')
    expect(typeof credova.createElement).toEqual('function')
    expect(typeof credova.createCardElement).toEqual('function')
    expect(typeof credova.createCardExpirationDateElement).toEqual('function')
    expect(typeof credova.createCardNumberElement).toEqual('function')
    expect(typeof credova.createCardVerificationCodeElement).toEqual('function')
  })
})
