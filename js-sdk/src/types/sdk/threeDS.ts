export type ThreeDSCreateSessionInput = {
  tokenId: string
}

export type ThreeDSCreateSessionResponse = {
  id: string
  cardBrand?: string
  additionalCardBrands: string[]
  error?: any
}

export type SaveThreeDsSessionRequest = {
  bt_session_id: string
  payment_intent_id: string
}

export type SaveThreeDsSessionResponse = {
  id: string,
  card_brand: string,
  additional_card_brands: string[]
}