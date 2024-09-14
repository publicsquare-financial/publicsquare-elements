import { PublicSquare } from '@/index'
import { PublicSquareCards } from '../'
import { getError } from '@/tests/utils'
import { ELEMENTS_CARDS_NO_POINTER_MESSAGE } from '@/constants'
import { generateCardCreateInput } from '@/tests/factories/cards'

jest.mock('@basis-theory/basis-theory-js', () => {
  BasisTheory: jest.fn()
})

describe('PublicSquare', () => {
  let publicsquare: PublicSquare
  let cards: PublicSquareCards
  beforeAll(() => {
    publicsquare = new PublicSquare()
    cards = new PublicSquareCards(publicsquare)
  })

  test('constructs', async () => {
    expect(cards).toBeDefined()
    const error = await getError<{ message: string }>(
      () => new (PublicSquareCards as any)()
    )
    expect(error.message).toEqual(ELEMENTS_CARDS_NO_POINTER_MESSAGE)
  })

  test('create() works', async () => {
    const input = generateCardCreateInput()
    const result = await cards.create(input)
    expect(result).toBe(undefined)
  })

  test('create() fails with invalid input', async () => {
    const input = generateCardCreateInput()
    const result = await cards.create({ card: {} } as any)
    expect(result).toBe(undefined)
  })
})
