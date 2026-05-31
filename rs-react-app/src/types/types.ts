import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type SerializedError } from '@reduxjs/toolkit';

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

export type SearchExtra = {
  total_pages: number;
  current_page: number;
  search_term: string;
};
export type SearchResponse = SearchAPIResponse & SearchExtra;

export type DetailsResponse = {
  name: string;
  image_uris?: { normal?: string };
  card_faces?: { image_uris?: { normal?: string } }[];
  id: string;
  set_name: string;
};

export type FetchSearchParams = {
  q: string;
  page: number;
};

export type FetchDetailsParams = {
  id: string | null;
};

export type UseFetchCardListReturn = {
  cardList: SearchResponse | undefined;
  isLoading: boolean;
  errorCode: ErrorCode;
};

export type UseFetchDetailsReturn = {
  detailsCard: DetailsResponse | null | undefined;
  isLoading: boolean;
  errorCode: ErrorCode;
};

export type FetchError = FetchBaseQueryError | SerializedError | undefined;
export type ErrorCode =
  | '404'
  | 'UnknownError'
  | 'UnprocessableContent'
  | 'NotANumber'
  | 'NotAZero'
  | boolean;
