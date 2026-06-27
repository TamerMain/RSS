import {
  ERROR_CODES,
  HTTP_STATUS,
  SEARCH_PARAMS,
  CACHE_TAG,
} from '@/constants/routes';
import {
  type FetchDetailsReturn,
  type FetchDetailsParams,
} from '@/types/types';
import {
  FETCH_BASE_URL,
  FETCH_DETAILS_URL,
  FETCH_CONTENT_ACCEPT,
  FETCH_CONTENT_TYPE,
} from '@/constants/fetch';

const REVALIDATE_TIME = Number(process.env.NEXT_PUBLIC_REVALIDATE_CACHE) || 60;

export default async function fetchDetails(
  params: FetchDetailsParams
): Promise<FetchDetailsReturn> {
  try {
    if (!params[SEARCH_PARAMS.DETAILS]) {
      throw new Error(ERROR_CODES.NOT_FOUND);
    }

    const url = `${FETCH_BASE_URL}/${FETCH_DETAILS_URL}${params[SEARCH_PARAMS.DETAILS]}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'rs-react-app/8.0.0',
        Accept: FETCH_CONTENT_ACCEPT,
        'Content-Type': FETCH_CONTENT_TYPE,
      },
      next: {
        tags: [CACHE_TAG.DETAILS],
        revalidate: REVALIDATE_TIME,
      },
    });
    if (!response.ok) {
      if (response.status === HTTP_STATUS.NOT_FOUND) {
        throw new Error(ERROR_CODES.NOT_FOUND);
      }
      throw new Error(ERROR_CODES.UNKNOWN_ERROR);
    }
    const data = await response.json();
    return { detailsCard: data, errorCode: false };
  } catch (error) {
    return {
      detailsCard: undefined,
      errorCode: (error as Error)
        .message as (typeof ERROR_CODES)[keyof typeof ERROR_CODES],
    };
  }
}
