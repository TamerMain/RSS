import { SEARCH_PARAMS } from '@/constants/routes';
import { type InitialParams } from '@/types/types';

export function getInitialParams(): InitialParams {
  const url = new URL(window.location.href);
  let q = url.searchParams.get(SEARCH_PARAMS.QUERY);
  if (q === null) {
    q = '';
  }

  let details = url.searchParams.get(SEARCH_PARAMS.DETAILS) ?? undefined;
  if (details === null) {
    details = undefined;
  }

  const page = url.searchParams.get(SEARCH_PARAMS.PAGE);
  if (page) {
    const pageNum = Number(page);
    if (!isNaN(pageNum)) {
      return { q: q, page: pageNum, details: details };
    }
  }
  return false;
}
