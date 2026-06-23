export const TEST_FETCH_URL = 'https://api.scryfall.com/cards/search' as const;
export const TEST_FETCH_DETAILS_URL =
  'https://api.scryfall.com/cards/' as const;

export const TEST_FETCH_DELAY = 100 as const;

export const TEST_FETCH_PARAMS = {
  VALID: '?page=1&q=Lotus+game%3Apaper',
  DEFAULT: '?page=1&q=+game%3Apaper',
  DEFAULT_PAGE_2: '?page=2&q=+game%3Apaper',
  PAGE_NOT_FOUND: '?page=200&q=Lotus+game%3Apaper',
  PAGE_NOT_NUMBER: '?page=INVALID&q=Lotus+game%3Apaper',
} as const;

export const TEST_FETCH_DETAILS_PARAMS = {
  VALID: '4a2e428c-dd25-484c-bbc8-2d6ce10ef42c',
  VALID_SECOND: '4c85d097-e87b-41ee-93c6-0e54ec41b174',
  INVALID: 'INVALID',
} as const;

export const TEST_SEARCH_URL = '/search/cards' as const;

export const TEST_SEARCH_INPUTS = {
  EMPTY: '',
  VALID: 'Lotus',
  INVALID: 'INVALID',
  NULL: null,
} as const;

export const TEST_SEARCH_RESULTS = {
  INITIAL: 5,
  VALID: 3,
  INVALID: 0,
  ERROR: 0,
} as const;

export const TEST_SEARCH_PARAMS = {
  NULL: '',
  EMPTY: '?q=&page=1',
  EMPTY_PAGE_2: '?q=&page=2',
  VALID: '?q=Lotus&page=1',
  INVALID: '?q=INVALID&page=1',
  NO_PAGE: '?q=Lotus&page=200',
  PAGE_NOT_NUMBER: '?q=Lotus&page=INVALID',
  PAGE_ZERO: '?q=Lotus&page=0',
  PAGE_NOT_NATURAL: '?q=Lotus&page=-0.45',
} as const;

export const TEST_DETAILS_PARAMS = {
  NULL: null,
  VALID: '&id=4a2e428c-dd25-484c-bbc8-2d6ce10ef42c',
  INVALID: '&id=INVALID',
} as const;
