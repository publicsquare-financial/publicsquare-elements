import { PublicSquare } from '@/index'
import { PublicSquareACH } from '../'
import { getError } from '@/tests/utils'
import { generateCardCreateInput } from '@/tests/factories/cards'

jest.mock('@basis-theory/basis-theory-js', () => {
  BasisTheory: jest.fn()
})

describe('PublicSquare', () => {
  let publicSquare: PublicSquare
  let ach: PublicSquareACH
  beforeAll(() => {
    publicSquare = new PublicSquare()
    ach = new PublicSquareACH(publicSquare)
  })

  test('constructs', async () => {
    expect(ach).toBeDefined()
    const error = await getError<{ message: string }>(
      () => new (PublicSquareACH as any)(publicSquare)
    )
    // expect(error.message).toEqual(ELEMENTS_CREDOVA_CARDS_NO_POINTER_MESSAGE)
  })

  test('create() works', async () => {
    const input = generateCardCreateInput()
    // const result = await cards.create(input)
    // expect(result).toBe(undefined)
  })

  test('create() fails with invalid input', async () => {
    const input = generateCardCreateInput()
    // const result = await cards.create({ card: {} } as any)
    // expect(result).toBe(undefined)
  })
})
