import {
  BankVerificationRequestBody,
  BankVerificationRequestToken
} from '@/types/sdk/verificationWidget'

declare const ChirpLink: any

export class VerificationWidget {
  private _input: BankVerificationRequestBody

  constructor(input: BankVerificationRequestBody) {
    this._input = input
  }

  public open() {
    // 1. Install script
    // 2. Make api requests
    // 3. Open widget
    // 4. Wait for response
    return this._installScript()
      .then(() => this._getRequestToken())
      .then((response) => this._openWidget(response))
  }

  private _installScript() {
    return new Promise((resolve, reject) => {
      const id = 'publicsquare-verification-widget'
      if (!document.getElementById(id)) {
        const script = document.createElement('script')
        script.id = id
        script.src = 'https://chirp.digital/cdn/chirplink.js'
        document.head.appendChild(script)
        script.onload = () => {
          resolve(true)
        }
        script.onerror = () => {
          reject(new Error('Failed to load verification widget'))
        }
      } else {
        resolve(true)
      }
    })
  }

  private _getRequestToken(): Promise<BankVerificationRequestToken> {
    return fetch('/api/widget-token', {
      method: 'POST',
      body: JSON.stringify(this._input)
    }).then((res) => res.json())
  }

  private _openWidget({ token, requestCode }: BankVerificationRequestToken) {
    return new Promise((resolve, reject) => {
      const chirp = new ChirpLink({
        token,
        onLoad: function (load: any) {
          console.log('On Load event', load)
        },
        onSuccess: function (success: {
          status: string
          statusDetails: string
          success: boolean
          urlToRedirect: string
        }) {
          console.log('On Success ', success)
          // this.getBalance(requestCode)
          resolve(chirp)
        },
        onError: function (err: any) {
          console.log('On Error ', err)
        },
        onClose: function (close: any) {
          console.log('on Close', close)
        },
        onBankSelect: function (bank: any) {
          console.log('On Bank Select', bank)
        },
        onAttempt: function (attempt: any) {
          console.log('On Attempt', attempt)
        }
      })
    })
  }

  private _getBalance(requestCode: string) {
    return fetch(`/api/balance?requestCode=${requestCode}`, {
      method: 'GET'
    }).then((res) => res.json())
  }
}
