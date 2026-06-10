import { ELEMENTS_PUBLICSQUARE_NO_POINTER_MESSAGE } from '../constants'
import type { PublicSquare } from '../PublicSquare'
import type {
  ThreeDSCreateSessionInput,
  ThreeDSCreateSessionResponse,
} from '../types'
import { validateSaveThreeDsSessionRequest } from '../validators'
import { transformCreateThreeDsSessionInput } from '../utils'

export class PublicSquareThreeDS {
  private _publicSquare: PublicSquare

  constructor(publicSquarePointer: PublicSquare) {
    if (!publicSquarePointer) {
      throw new Error(ELEMENTS_PUBLICSQUARE_NO_POINTER_MESSAGE)
    }
    this._publicSquare = publicSquarePointer
  }

  public async createSession(
    input: { token_id: string; payment_intent_id: string },
  ): Promise<ThreeDSCreateSessionResponse> {
    if (!this._publicSquare._apiKey) {
      throw new Error('apiKey must be sent at initialization')
    } else if (!this._publicSquare.bt || !this._publicSquare.bt.client) {
      throw new Error('PublicSquare JS has not be initialized yet')
    } else {
    
      const btPublicKey = this._publicSquare._publicAPIKey
      const { BasisTheory3ds } = await import('@basis-theory/web-threeds')
      const bt3ds = BasisTheory3ds(btPublicKey)
      const btSession = await bt3ds.createSession({ tokenId: input.token_id })

      const validatedInput = validateSaveThreeDsSessionRequest({
        bt_session_id: btSession.id,
        payment_intent_id: input.payment_intent_id
      })

      return fetch(this._publicSquare._threedsCreateSessionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this._publicSquare._apiKey,
          'BT-PROXY-KEY': this._publicSquare._proxyKey
        },
        body: JSON.stringify(transformCreateThreeDsSessionInput(validatedInput)),
      })
        .then((res) => res.json())
        .then((res) =>
          res.errors
            ? { error: res }
            : res
        )
    }
  }
}
