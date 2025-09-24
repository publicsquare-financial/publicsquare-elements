import { PublicSquare } from '../../index'
import { PublicSquareGooglePay } from '..'
import { getError } from '../../tests/utils'
import { ELEMENTS_PUBLICSQUARE_NO_POINTER_MESSAGE } from '../../constants'
import { GooglePayCreateInput } from '../../types'

jest.mock('@basis-theory/basis-theory-js', () => ({
  BasisTheory: jest.fn().mockImplementation(() => ({
    init: jest.fn().mockResolvedValue({
      createElement: jest.fn(),
      client: {
        post: jest.fn().mockResolvedValue({})
      }
    })
  }))
}))

const validGooglePayCreateInput: GooglePayCreateInput = {
  google_payment_data: {},
  customer_id: 'cus_123',
  billing_details: {
    address_line_1: '123 Main St',
    address_line_2: 'Apt 1',
    city: 'Anytown',
    state: 'CA',
    postal_code: '12345',
    country: 'US'
  }
}

describe('GooglePay', () => {
  let publicSquare: PublicSquare
  let googlePay: PublicSquareGooglePay
  let originalFetch: typeof global.fetch

  beforeAll(async () => {
    originalFetch = global.fetch
    global.fetch = jest.fn()
    publicSquare = await new PublicSquare().init('api_key')
    googlePay = new PublicSquareGooglePay(publicSquare)
  })

  afterAll(() => {
    global.fetch = originalFetch
  })

  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  test('constructs', async () => {
    expect(googlePay).toBeDefined()
    const error = await getError<{ message: string }>(
      () => new (PublicSquareGooglePay as any)()
    )
    expect(error.message).toEqual(
      ELEMENTS_PUBLICSQUARE_NO_POINTER_MESSAGE
    )
  })

  test('create() works', async () => {
    const mockResponse = {
      id: 'googlepay_123',
      ...validGooglePayCreateInput
    }
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    )

    const result = await googlePay.create(validGooglePayCreateInput)
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.publicsquare.com/payment-methods/google-pay',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'api_key'
        },
        body: JSON.stringify(validGooglePayCreateInput)
      }
    )
    expect(result).toEqual(mockResponse)
  })

  test('create() works with minimal valid input', async () => {
    const mockResponse = {
      id: 'googlepay_123'
    }
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    )
    const input = {
      google_payment_data: {}
    }
    const result = await googlePay.create(input)
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.publicsquare.com/payment-methods/google-pay',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'api_key'
        },
        body: JSON.stringify(input)
      }
    )
    expect(result).toEqual(mockResponse)
  })

  test('create() fails with invalid google_payment_data', async () => {
    const error = await getError<{ message: string }>(() =>
      googlePay.create({} as any)
    )
    expect(error.message).toEqual('google_payment_data is required')
  })

  test('create() only passes validated input', async () => {
    const mockResponse = {
      id: 'googlepay_123'
    }
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    )
    const input = {
      google_payment_data: {
        protocolVersion: 'ECv2',
        signature: 'abcd1234',
        intermediateSigningKey: {
            signedKey: 'key1234',
            signatures: ['xyz1234']
        },
        signedMessage: 'MEQCIA6xeBmZ02LNFJgt8aXfKRJRT2J0VSD'
      },
      random_value: 'abcdefgh'
    }
    await googlePay.create(input)
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.publicsquare.com/payment-methods/google-pay',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'api_key'
        },
        body: JSON.stringify({
          google_payment_data: {
            protocolVersion: 'ECv2',
            signature: 'abcd1234',
            intermediateSigningKey: {
                signedKey: 'key1234',
                signatures: ['xyz1234']
            },
            signedMessage: 'MEQCIA6xeBmZ02LNFJgt8aXfKRJRT2J0VSD'
          }
        })
      }
    )
  })
})
