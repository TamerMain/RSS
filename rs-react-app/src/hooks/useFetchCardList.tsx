'use client'

import { useCardListQuery } from '@/services/fetchAPI.ts';
import {
  type FetchSearchParams,
  type UseFetchCardListReturn,
  type FetchError,
} from '@/types/types.ts';
import { ERROR_CODES, HTTP_STATUS, SEARCH_PARAMS } from '@/constants/routes';

export default function useFetchCardList({
  [SEARCH_PARAMS.QUERY]: q,
  [SEARCH_PARAMS.PAGE]: page,
}: FetchSearchParams): UseFetchCardListReturn {
  const { data, isLoading, error, isFetching } = useCardListQuery(
    {
      [SEARCH_PARAMS.QUERY]: q,
      [SEARCH_PARAMS.PAGE]: page,
    },
    {
      skip:
        !page || isNaN(Number(page)) || !Number.isInteger(page) || page <= 0,
    }
  );

  const getErrorCode = (error: FetchError) => {
    if (isNaN(Number(page))) {
      return ERROR_CODES.NOT_NUMBER;
    }
    if (page === 0) {
      return ERROR_CODES.NOT_ZERO;
    }
    if (!Number.isInteger(page) || page <= 0) {
      return ERROR_CODES.NOT_NATURAL;
    }
    if (!error) return false;
    const status = 'status' in error ? error.status : null;
    switch (status) {
      case HTTP_STATUS.NOT_FOUND:
        return ERROR_CODES.NOT_FOUND;
      case HTTP_STATUS.UNPROCESSABLE_CONTENT:
        return ERROR_CODES.UNPROCESSABLE_CONTENT;
      default:
        return ERROR_CODES.UNKNOWN_ERROR;
    }
  };

  const errorCode = getErrorCode(error);

  return {
    cardList: data,
    isLoading: isLoading || isFetching,
    errorCode,
  };
}
