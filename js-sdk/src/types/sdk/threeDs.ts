//Basis Theory
export type ThreeDsCreateSessionInput = {
  tokenId: string
}
//Basis Theory
export type ThreeDsCreateSessionResponse = {
  id: string
  cardBrand?: string
  additionalCardBrands: string[]
  error?: any
}

//API
export type SaveThreeDsSessionRequest = {
  bt_session_id: string
  payment_intent_id: string
}
//API
export type SaveThreeDsSessionResponse = {
  id: string,
  card_brand: string,
  additional_card_brands: string[]
}

export type ValidatedSaveThreeDsSessionRequest = {
  validated: SaveThreeDsSessionRequest
}