import { PublicSquare } from '../'
import {
  ELEMENTS_INIT_ERROR_MESSAGE,
  ELEMENTS_TYPE_NOT_SUPPORTED
} from '@/constants'
import { getError } from '@/tests/utils'

describe('PublicSquare', () => {
  let publicsquare: PublicSquare
  beforeAll(() => (publicsquare = new PublicSquare()))

  test('constructs', () => {
    expect(publicsquare.bt).toBeUndefined()
    expect(typeof publicsquare.init).toEqual('function')
    expect(typeof publicsquare.createElement).toEqual('function')
    expect(typeof publicsquare.createCardElement).toEqual('function')
    expect(typeof publicsquare.createCardExpirationDateElement).toEqual('function')
    expect(typeof publicsquare.createCardNumberElement).toEqual('function')
    expect(typeof publicsquare.createCardVerificationCodeElement).toEqual('function')
  })

  test('throws error if init is not called', async () => {
    const error = await getError<{ message: string }>(() =>
      publicsquare.createElement('card', {})
    )
    expect(error.message).toEqual(ELEMENTS_INIT_ERROR_MESSAGE)
  })

  test('invalid element type throws element not supported error', async () => {
    const error = await getError<{ message: string }>(() =>
      publicsquare.createElement('cardlkasjdlfk' as any, {})
    )
    expect(error.message).toEqual(ELEMENTS_TYPE_NOT_SUPPORTED)
  })
})
