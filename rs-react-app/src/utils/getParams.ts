import { SEARCH_PARAMS } from '@/constants/routes';
import { FETCH_PARAMS } from '@/constants/fetch';

type CardSearchParams = {
  location?: string;
  q?: string;
  page?: number;
  details?: string | false;
};

export function createCardSearchParams(params: CardSearchParams): string {
  const p = new URLSearchParams(params.location);
  if (params.page) {
    p.set(SEARCH_PARAMS.PAGE, params.page.toString());
  }
  if (params.q) {
    p.set(SEARCH_PARAMS.QUERY, params.q);
  }
  if (params.details) {
    p.set(SEARCH_PARAMS.DETAILS, params.details);
  } else {
    p.delete(SEARCH_PARAMS.DETAILS);
  }
  return p.toString();
}

type FetchSearchParams = {
  q: string;
  page: number;
};

export function createFetchSearchParams(params: FetchSearchParams) {
  const p = new URLSearchParams();
  p.set(FETCH_PARAMS.PAGE, params.page.toString());
  p.set(FETCH_PARAMS.QUERY, `${params.q} ${FETCH_PARAMS.FILTER}`);
  return p.toString();
}

type InitialParams =
  | { q: string; page: number; details: string | undefined }
  | false;

export function getInitialParams(): InitialParams {
  const url = new URL(window.location.href);
  let q = url.searchParams.get(SEARCH_PARAMS.QUERY);
  if (q === null) {
    q = '';
  }
  const page = url.searchParams.get(SEARCH_PARAMS.PAGE);
  let details = url.searchParams.get(SEARCH_PARAMS.DETAILS) ?? undefined;
  if (details === null) {
    details = undefined;
  }

  if (page) {
    const pageNum = Number(page);
    if (!isNaN(pageNum)) {
      return { q: q, page: pageNum, details: details };
    }
  }
  return false;
}
