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
  DETAILS: 'details',
} as const;

export const ERROR_CODES = {
  NOT_FOUND: '404',
  UNKNOWN_ERROR: 'UnknownError',
  UNPROCESSABLE_CONTENT: 'UnprocessableContent',
} as const;

export const CACHE_TAG = {
  CARD_LIST: 'Card List',
  DETAILS: 'Details',
} as const;
