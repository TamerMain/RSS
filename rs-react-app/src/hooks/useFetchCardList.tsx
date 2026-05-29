import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { createCardSearchParams } from '@/utils/createCardSearchParams.ts';
import { NAVIGATION, ERROR_CODES } from '@/constants/routes';
import { useFetchCardListQuery } from '@/services/fetchAPI.ts';
import { type FetchSearchParams } from '@/types/types.ts';

export type ErrorCode = '404' | 'UnknownError' | false;

export default function useFetchCardList() {
  const navigate = useNavigate();
  const [params, setParams] = useState<FetchSearchParams>({
    q: '',
    page: 1,
  });

  const {
    data: cardList,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useFetchCardListQuery(
    { q: params.q || '', page: params.page || 1 },
  );

  const errorCode = error
    ? 'status' in error && error.status === 404
      ? ERROR_CODES.NOT_FOUND
      : ERROR_CODES.UNKNOWN_ERROR
    : false;

  const updateCardList = useCallback(
    async ({ q = '1', page = 1 }: FetchSearchParams) => {
      setParams({ q, page });
      navigate({
        pathname: NAVIGATION.SEARCH.CARDS,
        search: createCardSearchParams({ q, page }),
      });
    },
    [navigate]
  );

  useEffect(() => {
    if (error && 'status' in error && error.status === 404) {
      navigate(NAVIGATION.SEARCH.CARDS_NOT_FOUND);
    }
  }, [error, navigate]);

  return {
    cardList,
    updateCardList,
    isLoading: isLoading || isFetching,
    errorCode,
    refetch,
  };
}
