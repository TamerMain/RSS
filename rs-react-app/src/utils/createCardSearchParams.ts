import { SEARCH_PARAMS } from '@/constants/routes';
import { type CardSearchParams } from '@/types/types';

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
