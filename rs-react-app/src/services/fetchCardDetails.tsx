export const BASE_URL: string = 'https://api.scryfall.com/cards/';

export type DetailsResponse = {
  name: string;
  image_uris?: { normal?: string };
  card_faces?: { image_uris?: { normal?: string } }[];
  id: string;
  set_name: string;
};

export async function detailsRequest(id: string) {
  const path: string = `${BASE_URL}${id}`;

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
  const responseObj: DetailsResponse = await response.json();

  return responseObj;
}
