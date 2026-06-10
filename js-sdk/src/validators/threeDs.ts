import {
  SaveThreeDsSessionRequest,
  ValidatedSaveThreeDsSessionRequest
} from '@/types'

export function validateSaveThreeDsSessionRequest(
  input: SaveThreeDsSessionRequest
): ValidatedSaveThreeDsSessionRequest {
  if (typeof input.bt_session_id !== 'string' || !input.bt_session_id) {
    throw new Error('bt_session_id is required')
  }
  return {
    validated: {
      bt_session_id: input.bt_session_id,
      payment_intent_id: input.payment_intent_id
    }
  }
}
