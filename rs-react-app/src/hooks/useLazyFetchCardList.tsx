import { useCallback } from 'react';
import { useStableSearchParams } from './useStableSearchParams';
import { useFetchCardListQuery } from '@/services/fetchAPI.ts';
import {
  type FetchSearchParams,
  type UseFetchCardListReturn,
  type FetchError,
} from '@/types/types.ts';
import { ERROR_CODES, SEARCH_PARAMS } from '@/constants/routes';

export default function useFetchCardList(): UseFetchCardListReturn {
  const [searchParams, setSearchParams] = useStableSearchParams();
  const q = searchParams.get(SEARCH_PARAMS.QUERY) || '';
  const page = Number(searchParams.get(SEARCH_PARAMS.PAGE)) || 1;

  const { data, isLoading, error, isFetching } = useFetchCardListQuery({
    q,
    page,
  });

  const getErrorCode = (error: FetchError) => {
    if (!error) return false;
    const status = 'status' in error ? error.status : null;

    switch (status) {
      case 404:
        return ERROR_CODES.NOT_FOUND;
      case 422:
        return ERROR_CODES.UNPROCESSABLE_CONTENT;
      default:
        return ERROR_CODES.UNKNOWN_ERROR;
    }
  };

  const errorCode = getErrorCode(error);

  const updateCardList = useCallback(
    ({ q: newQ, page: newPage }: FetchSearchParams) => {
      setSearchParams((prev) => {
        const currQ = prev.get(SEARCH_PARAMS.QUERY);
        const currPage = prev.get(SEARCH_PARAMS.PAGE);

        if (currQ === newQ && currPage === newPage.toString()) {
          return prev;
        }

        prev.set(SEARCH_PARAMS.QUERY, newQ || '');
        prev.set(SEARCH_PARAMS.PAGE, newPage.toString());
        return prev;
      });
    },
    [setSearchParams]
  );

  return {
    cardList: data,
    updateCardList,
    isLoading: isLoading || isFetching,
    errorCode,
  };
}
