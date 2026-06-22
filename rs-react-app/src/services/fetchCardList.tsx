import {
  FETCH_BASE_URL,
  FETCH_SEARCH_URL,
  FETCH_PARAMS,
  FETCH_CONTENT_ACCEPT,
  FETCH_CONTENT_TYPE,
} from '@/constants/fetch';
import { transformFetchSearchResponse } from '@/utils/transformFetchSearchResponse';
import { createFetchSearchParams } from '@/utils/createFetchSearchParams';
import {
  type FetchSearchParams,
  type FetchCardListReturn,
} from '@/types/types.ts';
import { ERROR_CODES, HTTP_STATUS, SEARCH_PARAMS } from '@/constants/routes';

const REVALIDATE_TIME = Number(process.env.NEXT_PUBLIC_REVALIDATE_CACHE) || 60;

export default async function fetchCardList(
  params: FetchSearchParams
): Promise<FetchCardListReturn> {
  try {
    if (isNaN(Number(params[SEARCH_PARAMS.PAGE]))) {
      throw new Error(ERROR_CODES.NOT_NUMBER);
    }
    if (params[SEARCH_PARAMS.PAGE] === 0) {
      throw new Error(ERROR_CODES.NOT_ZERO);
    }
    if (
      !Number.isInteger(params[SEARCH_PARAMS.PAGE]) ||
      params[SEARCH_PARAMS.PAGE] <= 0
    ) {
      throw new Error(ERROR_CODES.NOT_NATURAL);
    }

    const url = `${FETCH_BASE_URL}/${FETCH_SEARCH_URL}${createFetchSearchParams({ [FETCH_PARAMS.QUERY]: params[SEARCH_PARAMS.QUERY], [FETCH_PARAMS.PAGE]: params[SEARCH_PARAMS.PAGE] })}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'rs-react-app/8.0.0',
        Accept: FETCH_CONTENT_ACCEPT,
        'Content-Type': FETCH_CONTENT_TYPE,
      },
      next: {
        tags: ['Card List'],
        revalidate: REVALIDATE_TIME,
      }
    });
    if (!response.ok) {
      if (response.status === HTTP_STATUS.NOT_FOUND)
        throw new Error(ERROR_CODES.NOT_FOUND);
      if (response.status === HTTP_STATUS.UNPROCESSABLE_CONTENT)
        throw new Error(ERROR_CODES.UNPROCESSABLE_CONTENT);
      throw new Error(ERROR_CODES.UNKNOWN_ERROR);
    }
    const data = transformFetchSearchResponse(await response.json(), params);
    return { cardList: data, errorCode: false };
  } catch (error) {
    return {
      cardList: undefined,
      errorCode: (error as Error)
        .message as (typeof ERROR_CODES)[keyof typeof ERROR_CODES],
    };
  }
}
