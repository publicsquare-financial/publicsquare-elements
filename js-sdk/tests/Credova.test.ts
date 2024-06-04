import { Credova } from '../src'
import {
  ELEMENTS_INIT_ERROR_MESSAGE,
  ELEMENTS_TYPE_NOT_SUPPORTED
} from '../src/constants'
import { getError } from './utils'

describe('Credova', () => {
  let credova: Credova
  beforeAll(() => (credova = new Credova()))

  test('constructs', () => {
    expect(credova.bt).toBeUndefined()
    expect(typeof credova.init).toEqual('function')
    expect(typeof credova.createElement).toEqual('function')
    expect(typeof credova.createCardElement).toEqual('function')
    expect(typeof credova.createCardExpirationDateElement).toEqual('function')
    expect(typeof credova.createCardNumberElement).toEqual('function')
    expect(typeof credova.createCardVerificationCodeElement).toEqual('function')
  })

  test('throws error if init is not called', async () => {
    const error = await getError<{ message: string }>(() =>
      credova.createElement('card', {})
    )
    expect(error.message).toEqual(ELEMENTS_INIT_ERROR_MESSAGE)
  })

  test('invalid element type throws element not supported error', async () => {
    const error = await getError<{ message: string }>(() =>
      credova.createElement('cardlkasjdlfk' as any, {})
    )
    expect(error.message).toEqual(ELEMENTS_TYPE_NOT_SUPPORTED)
  })
})
