import { FETCH_DETAILS_BASE_URL, GET_HEADERS } from '@/constants/fetch';

export type DetailsResponse = {
  name: string;
  image_uris?: { normal?: string };
  card_faces?: { image_uris?: { normal?: string } }[];
  id: string;
  set_name: string;
};

export async function detailsRequest(id: string) {
  const path= `${FETCH_DETAILS_BASE_URL}${id}`;

  const response = await fetch(path, GET_HEADERS);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const responseObj: DetailsResponse = await response.json();
  
  return responseObj;
}
