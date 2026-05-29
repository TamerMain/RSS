export const FETCH_BASE_URL = 'https://api.scryfall.com';
export const FETCH_SEARCH_URL = 'cards/search?';
export const FETCH_DETAILS_URL = 'cards/';

export const FETCH_METHOD = 'GET';
export const FETCH_CONTENT_TYPE = 'application/json; charset=utf-8';
export const FETCH_CONTENT_ACCEPT = 'application/json;q=0.9,*/*;q=0.8';

export const CARD_PER_PAGE = 175;

export const FETCH_PARAMS = {
  QUERY: 'q',
  PAGE: 'page',
  FILTER: 'game:paper',
} as const;
