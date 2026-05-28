export const ROUTES = {
  HOME: '/',
  ABOUT: 'about',
  SEARCH: {
    BASE: 'search',
    CHILDREN: {
      CARDS: 'cards',
      CARDS_NOT_FOUND: 'cards-not-found',
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
    CARDS_NOT_FOUND: '/search/cards-not-found',
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
} as const;
