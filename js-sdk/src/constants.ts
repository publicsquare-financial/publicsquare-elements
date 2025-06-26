const ELEMENTS_INIT_ERROR_MESSAGE =
  'PublicSquare Elements was not properly initialized.'

const ELEMENTS_TYPE_NOT_SUPPORTED =
  'PublicSquare Elements does not support the type of element specified.'

const ELEMENTS_NOM_DOM_ERROR_MESSAGE =
  'Tried to load PublicSquare Elements in a non-DOM environment. Only client-side environments are supported.'

const ELEMENTS_SCRIPT_LOAD_ERROR_MESSAGE =
  'PublicSquare Elements did not load properly.'

const ELEMENTS_SCRIPT_UNKNOWN_ERROR_MESSAGE =
  'There was an unknown error when loading PublicSquare Elements. Check the console for details.'

const ELEMENTS_CARDS_NO_POINTER_MESSAGE =
  'PublicSquareCards requires publicSquarePointer when initializing'

const ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_NO_POINTER_MESSAGE =
  'PublicSquareBankAccount requires psqPointer when initializing'

const ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_VERIFICATION_SAVE_ERROR_MESSAGE =
  'PublicSquare Elements did not save the bank account verification properly.'

const ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_ROUTING_NUMBER_LOAD_ERROR_MESSAGE =
  'PublicSquare Elements did not load the routing number element properly.'

const ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_ACCOUNT_NUMBER_LOAD_ERROR_MESSAGE =
  'PublicSquare Elements did not load the account number element properly.'

const CARD_BRANDS = [
  'visa',
  'mastercard',
  'american-express',
  'discover',
  'diners-club',
  'jcb',
  'unionpay',
  'maestro',
  'elo',
  'hiper',
  'hipercard',
  'mir',
  'unknown'
] as const

const CARD_ICON_POSITIONS = ['left', 'right', 'none'] as const

const AUTOCOMPLETE_VALUES = ['off', 'on'] as const

const API_ENDPOINTS = {
  BASE_URL: 'https://collect-staging.publicsquare.com',
  /**
   * Endpoint to save new cards to
   */
  get COLLECT_CARD() {
    return `${this.BASE_URL}`
  }
}

export {
  ELEMENTS_INIT_ERROR_MESSAGE,
  ELEMENTS_TYPE_NOT_SUPPORTED,
  ELEMENTS_NOM_DOM_ERROR_MESSAGE,
  ELEMENTS_SCRIPT_LOAD_ERROR_MESSAGE,
  ELEMENTS_SCRIPT_UNKNOWN_ERROR_MESSAGE,
  ELEMENTS_CARDS_NO_POINTER_MESSAGE,
  ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_NO_POINTER_MESSAGE,
  ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_ROUTING_NUMBER_LOAD_ERROR_MESSAGE,
  ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_ACCOUNT_NUMBER_LOAD_ERROR_MESSAGE,
  ELEMENTS_PUBLICSQUARE_BANK_ACCOUNT_VERIFICATION_SAVE_ERROR_MESSAGE,
  CARD_BRANDS,
  CARD_ICON_POSITIONS,
  AUTOCOMPLETE_VALUES,
  API_ENDPOINTS
}
