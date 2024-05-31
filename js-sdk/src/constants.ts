const ELEMENTS_INIT_ERROR_MESSAGE =
  'Credova Elements was not properly initialized.'

const ELEMENTS_TYPE_NOT_SUPPORTED =
  'Credova Elements does not support the type of element specified.'

const ELEMENTS_NOM_DOM_ERROR_MESSAGE =
  'Tried to load Credova Elements in a non-DOM environment.'

const ELEMENTS_SCRIPT_LOAD_ERROR_MESSAGE =
  'Credova Elements did not load properly.'

const ELEMENTS_SCRIPT_UNKNOWN_ERROR_MESSAGE =
  'There was an unknown error when loading Credova Elements. Check the console for details.'

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
  COLLECT_CARD: 'https://collect.psqpay.com'
}

export {
  ELEMENTS_INIT_ERROR_MESSAGE,
  ELEMENTS_TYPE_NOT_SUPPORTED,
  ELEMENTS_NOM_DOM_ERROR_MESSAGE,
  ELEMENTS_SCRIPT_LOAD_ERROR_MESSAGE,
  ELEMENTS_SCRIPT_UNKNOWN_ERROR_MESSAGE,
  CARD_BRANDS,
  CARD_ICON_POSITIONS,
  AUTOCOMPLETE_VALUES,
  API_ENDPOINTS
}
