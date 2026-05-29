import { useCallback } from 'react';
import { useStableSearchParams } from './useStableSearchParams';
import { ERROR_CODES, SEARCH_PARAMS } from '@/constants/routes';
import { useFetchCardDetailsQuery } from '@/services/fetchAPI';
import { type UseFetchDetailsReturn } from '@/types/types';

export default function useLazyFetchDetails(): UseFetchDetailsReturn {
  const [searchParams, setSearchParams] = useStableSearchParams();
  const details = searchParams.get(SEARCH_PARAMS.DETAILS) || '';

  const { data, isLoading, error, isFetching } =
    useFetchCardDetailsQuery(details, {
      skip: !details,
    });

  const errorCode = error
    ? 'status' in error && error.status === 404
      ? ERROR_CODES.NOT_FOUND
      : ERROR_CODES.UNKNOWN_ERROR
    : false;

  const updateDetails = useCallback(
    (id: string | null) => {
      if (id) {
        setSearchParams((prev) => {
          prev.set(SEARCH_PARAMS.DETAILS, id);
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          prev.delete(SEARCH_PARAMS.DETAILS);
          return prev;
        });
      }
    },
    [setSearchParams]
  );

  return {
    detailsCard: data,
    updateDetails,
    isLoading: isLoading || isFetching,
    errorCode,
  };
}
