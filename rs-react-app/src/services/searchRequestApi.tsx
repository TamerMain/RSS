export const BASE_URL: string = 'https://api.scryfall.com/cards/search';

export type SearchResponse = {
  object: string;
  data: {
    name: string;
    image_uris?: { normal?: string };
    id: string;
  }[];
  has_more: boolean;
  next_page?: string;
  total_cards?: number;
};

export async function searchRequest(
  searchTerm: string
): Promise<SearchResponse> {
  const path: string = `${BASE_URL}?q=${searchTerm}+%28game%3Apaper%29`;
  const response = await fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json;q=0.9,*/*;q=0.8',
    },
  });
  const cardList: SearchResponse = await response.json();
  return cardList;
}
