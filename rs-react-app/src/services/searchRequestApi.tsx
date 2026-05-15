export const BASE_URL: string = 'https://api.scryfall.com/cards/search';

export const CARD_PER_PAGE = 175;

export type SearchAPIResponse = {
  object: string;
  page: number;
  total_cards: number;
  data: {
    name: string;
    image_uris?: { normal?: string };
    card_faces?: { image_uris?: { normal?: string } }[];
    id: string;
  }[];
};

export type SearchExtra = { total_pages: number };
export type SearchResponse = SearchAPIResponse & SearchExtra;

export async function searchRequest(searchTerm: string, searchPage: number) {
  const path: string = `${BASE_URL}?page=${searchPage}&q=${searchTerm}+%28game%3Apaper%29`;

  const response = await fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json;q=0.9,*/*;q=0.8',
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const responseObj: SearchAPIResponse = await response.json();
  const totalPages = Math.ceil(responseObj.total_cards / CARD_PER_PAGE);
  const cardList: SearchResponse = {
    ...responseObj,
    total_pages: totalPages,
  };
  console.log(cardList, path);

  return cardList;
}
