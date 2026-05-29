import { FETCH_PARAMS } from '@/constants/fetch';
import { type FetchSearchParams } from '@/types/types';

export function createFetchSearchParams(params: FetchSearchParams) {
  const p = new URLSearchParams();
  p.set(FETCH_PARAMS.PAGE, params.page.toString());
  p.set(FETCH_PARAMS.QUERY, `${params.q} ${FETCH_PARAMS.FILTER}`);
  return p.toString();
}
