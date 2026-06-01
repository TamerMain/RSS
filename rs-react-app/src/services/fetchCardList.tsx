import {
  FETCH_SEARCH_BASE_URL,
  GET_HEADERS,
  CARD_PER_PAGE,
} from '@/constants/fetch';
import { createFetchSearchParams } from '@/utils/getParams';

export type SearchAPIResponse = {
  page: number;
  total_cards: number;
  data: {
    name: string;
    image_uris?: { normal?: string };
    card_faces?: { image_uris?: { normal?: string } }[];
    id: string;
  }[];
};
export type SearchExtra = { total_pages: number; current_page: number };
export type SearchResponse = SearchAPIResponse & SearchExtra;



export async function searchRequest(searchTerm: string, searchPage: number) {
  const params = createFetchSearchParams({ page: searchPage, q: searchTerm });
  const path = `${FETCH_SEARCH_BASE_URL}?${params}`;

  const response = await fetch(path, GET_HEADERS);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const responseObj: SearchAPIResponse = await response.json();

  
  const totalPages = Math.ceil(responseObj.total_cards / CARD_PER_PAGE);
  const cardList: SearchResponse = {
    ...responseObj,
    current_page: searchPage,
    total_pages: totalPages,
  };

  return cardList;
}
