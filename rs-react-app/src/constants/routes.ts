export const ROUTES = {
  HOME: '/',
  ABOUT: 'about',
  SEARCH: {
    BASE: 'search',
    CHILDREN: {
      CARDS: 'cards',
    },
  },
  NOT_FOUND: '/*',
} as const;

export const NAVIGATION = {
  HOME: '/',
  ABOUT: '/about',
  SEARCH: {
    BASE: '/search',
    CARDS: '/search/cards',
  },
  NOT_FOUND: '/*',
} as const;

export const SEARCH_PARAMS = {
  QUERY: 'q',
  PAGE: 'page',
  DETAILS: 'id',
} as const;

export const HTTP_STATUS = {
  NOT_FOUND: 404,
  UNPROCESSABLE_CONTENT: 422,
} as const;

export const ERROR_CODES = {
  NOT_FOUND: '404',
  UNKNOWN_ERROR: 'UnknownError',
  UNPROCESSABLE_CONTENT: 'UnprocessableContent',
  NOT_NUMBER: 'NotANumber',
  NOT_ZERO: 'NotAZero',
  NOT_NATURAL: 'NotNatural',
} as const;

export const CACHE_TAG = {
  CARD_LIST: 'Card List',
  DETAILS: 'Details',
} as const;
