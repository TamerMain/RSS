import { ERROR_CODES, HTTP_STATUS, SEARCH_PARAMS } from '@/constants/routes';
import { useCardDetailsQuery } from '@/services/fetchAPI';
import {
  type UseFetchDetailsReturn,
  type FetchDetailsParams,
} from '@/types/types';

export default function useFetchDetails(
  params: FetchDetailsParams
): UseFetchDetailsReturn {
  const { data, isLoading, error, isFetching } = useCardDetailsQuery(params, {
    skip: !params?.[SEARCH_PARAMS.DETAILS],
  });

  const errorCode = error
    ? 'status' in error && error.status === HTTP_STATUS.NOT_FOUND
      ? ERROR_CODES.NOT_FOUND
      : ERROR_CODES.UNKNOWN_ERROR
    : false;

  return {
    detailsCard: data,
    isLoading: isLoading || isFetching,
    errorCode,
  };
}
