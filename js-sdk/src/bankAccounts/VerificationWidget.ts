import {
  BankVerificationRequestBody,
  BankVerificationUrlResponse,
  BankVerificationIdRequest,
  BankVerificationIdResponse
} from '@/types/sdk/verificationWidget'
import { PublicSquare } from '../PublicSquare'
import {
  ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_NO_POINTER_MESSAGE,
  ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_VERIFICATION_SAVE_ERROR_MESSAGE
} from '../constants'
declare const ChirpLink: any

export class VerificationWidget {
  private _publicSquare: PublicSquare
  private _messageHandler: ((event: MessageEvent) => void) | null = null

  constructor(psqPointer: PublicSquare) {
    if (!psqPointer) {
      throw Error(ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_NO_POINTER_MESSAGE)
    }
    this._publicSquare = psqPointer
    console.log('VerificationWidget constructor', {
      psqPointer
    })
  }

  public open(): Promise<BankVerificationIdResponse> {
    // 1. Install script
    // 2. Make api requests
    // 3. Open widget
    // 4. Wait for response
    return this._getAuthorizationUrl().then((response) => {
      this._buildContainer(response.authorization_url)
      return this._setupMessageListener()
    })
  }

  private _setupMessageListener(): Promise<BankVerificationIdResponse> {
    return new Promise((resolve, reject) => {
      this._messageHandler = (e: MessageEvent) => {
        const data = e.data
        console.log('data', data)
        if (data && typeof data === 'object') {
          if (data.step === 'APP_MOUNTED') {
            // Handle app mounted event
            console.log('Verification widget mounted')
          } else if (
            data.step === 'REDIRECT' &&
            data.loginId &&
            data.requestId
          ) {
            // Handle redirect event with loginId and requestId
            this._saveBankAccountVerification({
              verification_code: data.loginId,
              request_id: data.requestId
            })
              .then(resolve)
              .catch(reject)
          }
        }
      }
      window.addEventListener('message', this._messageHandler)
    })
  }

  public destroy() {
    if (this._messageHandler) {
      window.removeEventListener('message', this._messageHandler)
      this._messageHandler = null
    }
  }

  private _saveBankAccountVerification(
    request: BankVerificationIdRequest
  ): Promise<BankVerificationIdResponse> {
    return fetch(this._publicSquare._bankAccountVerificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this._publicSquare._apiKey!
      },
      body: JSON.stringify(request)
    })
      .then((res) => {
        console.log('res', res)
        return res.json()
      })
      .then((res) =>
        res.errors
          ? {
              error: res
            }
          : res
      )
  }

  private _buildContainer(url: string) {
    const container = document.createElement('div')
    container.id = 'publicsquare-verification-widget'
    container.style.display = 'flex'
    container.style.justifyContent = 'center'
    container.style.alignItems = 'center'
    container.style.height = '100%'
    container.style.width = '100%'
    document.body.appendChild(container)
    const iframe = document.createElement('iframe')
    iframe.src = url
    iframe.style.width = '100%'
    iframe.style.height = '768px'
    iframe.style.border = '1px solid #d1d5dc'
    iframe.style.borderRadius = '4px'
    container.appendChild(iframe)
  }

  private _getAuthorizationUrl(): Promise<BankVerificationUrlResponse> {
    return fetch(this._publicSquare._bankAccountVerificationUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this._publicSquare._apiKey!
      }
    })
      .then((res) => res.json())
      .then((res) =>
        res.errors
          ? {
              error: res
            }
          : res
      )
  }
}
