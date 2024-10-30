import { PublicSquare } from "@/PublicSquare";
import { PublicSquareBankAccounts } from "@/bankaccounts";
import { getError } from "@/tests/utils";
import { ELEMENTS_PUBLICSQUARE_BANKACCOUNTS_NO_POINTER_MESSAGE } from "@/constants";
import { generateBankAccountCreateInput } from "@/tests/factories/bankaccounts";

jest.mock('@basis-theory/basis-theory-js', () => {
  BasisTheory: jest.fn()
})

describe('PublicSquare', () => {
  let publicsquare: PublicSquare
  let bankaccounts: PublicSquareBankAccounts
  beforeAll(() => {
    publicsquare = new PublicSquare()
    bankaccounts = new PublicSquareBankAccounts(publicsquare)
  })

  test('constructs', async () => {
    expect(bankaccounts).toBeDefined()
    const error = await getError<{ message: string }>(
      () => new (PublicSquareBankAccounts as any)()
    )
    expect(error.message).toEqual(ELEMENTS_PUBLICSQUARE_BANKACCOUNTS_NO_POINTER_MESSAGE)
  })

  test('create() works', async () => {
    const input = generateBankAccountCreateInput()
    const result = await bankaccounts.create(input)
    expect(result).toBe(undefined)
  })

  test('create() fails with invalid input', async () => {
    const result = await bankaccounts.create({ account_number: '1234567' } as any)
    expect(result).toBe(undefined)
  })
})