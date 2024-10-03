import { Credova } from '@/index'
import { CredovaCards } from '../'
import { getError } from '@/tests/utils'
import { ELEMENTS_CREDOVA_CARDS_NO_POINTER_MESSAGE } from '@/constants'
import { generateCardCreateInput } from '@/tests/factories/cards'

jest.mock('@basis-theory/basis-theory-js', () => {
  BasisTheory: jest.fn()
})

describe('Credova', () => {
  let credova: Credova
  let cards: CredovaCards
  beforeAll(() => {
    credova = new Credova()
    cards = new CredovaCards(credova)
  })

  test('constructs', async () => {
    expect(cards).toBeDefined()
    const error = await getError<{ message: string }>(
      () => new (CredovaCards as any)()
    )
    expect(error.message).toEqual(ELEMENTS_CREDOVA_CARDS_NO_POINTER_MESSAGE)
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
