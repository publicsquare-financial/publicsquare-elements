import { PublicSquare } from '@/index'
import { PublicSquareCards } from '..'
import { getError } from '@/tests/utils'
import { ELEMENTS_PUBLICSQUARE_NO_POINTER_MESSAGE } from '@/constants'
import { generateCardCreateInput } from '@/tests/factories/cards'

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

describe('Cards', () => {
  let publicsquare: PublicSquare
  let cards: PublicSquareCards
  beforeAll(async () => {
    publicsquare = await new PublicSquare().init('api_key')
    cards = new PublicSquareCards(publicsquare)
  })

  test('constructs', async () => {
    expect(cards).toBeDefined()
    const error = await getError<{ message: string }>(
      () => new (PublicSquareCards as any)()
    )
    expect(error.message).toEqual(ELEMENTS_PUBLICSQUARE_NO_POINTER_MESSAGE)
  })

  test('create() works', async () => {
    const input = generateCardCreateInput()
    const result = await publicsquare.cards.create(input)
    expect(result).toEqual({})
  })

  test('create() fails with invalid input', async () => {
    const error = await getError<{ message: string }>(() =>
      publicsquare.cards.create({ card: {} } as any)
    )
    expect(error.message).toBe('cardholder_name is required')
  })
})
