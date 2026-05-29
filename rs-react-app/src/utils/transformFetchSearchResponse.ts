import { CARD_PER_PAGE } from '@/constants/fetch';
import {
  type FetchSearchParams,
  type SearchAPIResponse,
  type SearchResponse,
} from '@/types/types';

export function transformFetchSearchResponse(
  res: SearchAPIResponse,
  params: FetchSearchParams
) {
  const totalPages = Math.ceil(res.total_cards / CARD_PER_PAGE);
  const response: SearchResponse = {
    ...res,
    current_page: params.page,
    total_pages: totalPages,
    search_term: params.q,
  };
  return response;
}
