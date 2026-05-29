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

export type CardSearchParams = {
  location?: string;
  q?: string;
  page?: number;
  details?: string | false;
};

export type FetchSearchParams = {
  q: string;
  page: number;
};

export type InitialParams =
  | { q: string; page: number; details: string | undefined }
  | false;

export type ErrorCode = '404' | 'UnknownError' | boolean;

export type UseFetchCardListReturn = {
  cardList: SearchResponse | undefined;
  updateCardList: (params: FetchSearchParams) => void;
  isLoading: boolean;
  errorCode: ErrorCode;
};

export type UseFetchDetailsReturn = {
  detailsCard: DetailsResponse | null | undefined;
  updateDetails: (id: string | null) => void;
  isLoading: boolean;
  errorCode: ErrorCode;
};
