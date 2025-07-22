import { PublicSquare } from '../../index'
import { PublicSquareApplePay } from '..'
import { getError } from '../../tests/utils'
import { ELEMENTS_PUBLICSQUARE_APPLE_PAY_NO_POINTER_MESSAGE } from '../../constants'
import { ApplePayCreateInput } from '../../types'

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

const validApplePayCreateInput: ApplePayCreateInput = {
  apple_payment_data: {},
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

describe('ApplePay', () => {
  let publicSquare: PublicSquare
  let applePay: PublicSquareApplePay
  let originalFetch: typeof global.fetch

  beforeAll(async () => {
    originalFetch = global.fetch
    global.fetch = jest.fn()
    publicSquare = await new PublicSquare().init('api_key')
    applePay = new PublicSquareApplePay(publicSquare)
  })

  afterAll(() => {
    global.fetch = originalFetch
  })

  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  test('constructs', async () => {
    expect(applePay).toBeDefined()
    const error = await getError<{ message: string }>(
      () => new (PublicSquareApplePay as any)()
    )
    expect(error.message).toEqual(
      ELEMENTS_PUBLICSQUARE_APPLE_PAY_NO_POINTER_MESSAGE
    )
  })

  test('create() works', async () => {
    const mockResponse = {
      id: 'applepay_123',
      ...validApplePayCreateInput
    }
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    )

    const result = await applePay.create(validApplePayCreateInput)
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.publicsquare.com/payment-methods/apple-pay',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'api_key'
        },
        body: JSON.stringify(validApplePayCreateInput)
      }
    )
    expect(result).toEqual(mockResponse)
  })

  test('create() works with minimal valid input', async () => {
    const mockResponse = {
      id: 'applepay_123'
    }
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    )
    const input = {
      apple_payment_data: {}
    }
    const result = await applePay.create(input)
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.publicsquare.com/payment-methods/apple-pay',
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

  test('create() fails with invalid apple_payment_data', async () => {
    const error = await getError<{ message: string }>(() =>
      applePay.create({} as any)
    )
    expect(error.message).toEqual('apple_payment_data is required')
  })

  test('create() only passes validated input', async () => {
    const mockResponse = {
      id: 'applepay_123'
    }
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    )
    const input = {
      apple_payment_data: {
        paymentData: {
          data: 'abcd1234'
        }
      },
      random_value: 'abcdefgh'
    }
    await applePay.create(input)
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.publicsquare.com/payment-methods/apple-pay',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'api_key'
        },
        body: JSON.stringify({
          apple_payment_data: {
            paymentData: {
              data: 'abcd1234'
            }
          }
        })
      }
    )
  })
})
