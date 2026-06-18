import { CardCreateInput } from '@/types/sdk/cards'

export const TEST_CARD_NUMBER = '4242424242424242'
export const TEST_CARD_NUMBER_3DS_CHALLENGE = '4000000000003220'

export function generateCardCreateInput(
  override: object = {}
): CardCreateInput {
  return {
    cardholder_name: 'Jane Doe',
    card: {
      number: TEST_CARD_NUMBER,
      cvc: '123',
      expirationMonth: '12',
      expirationYear: (new Date().getFullYear() + 1).toString(),
      ...override
    } as any
  }
}

export function generateThreeDsCardCreateInput(
  override: object = {}
): CardCreateInput {
  return generateCardCreateInput({ number: TEST_CARD_NUMBER_3DS_CHALLENGE, ...override })
}
