export const FETCH_SEARCH_BASE_URL = 'https://api.scryfall.com/cards/search';
export const FETCH_DETAILS_BASE_URL = 'https://api.scryfall.com/cards/';

export const GET_HEADERS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json;q=0.9,*/*;q=0.8',
    
  },
} as const;

export const CARD_PER_PAGE = 175;

export const FETCH_PARAMS = {
  QUERY: 'q',
  PAGE: 'page',
  FILTER: 'game:paper',
} as const;
