import { ERROR_CODES } from '@/constants/routes';
import { useFetchCardDetailsQuery } from '@/services/fetchAPI';
import {
  type UseFetchDetailsReturn,
  type FetchDetailsParams,
} from '@/types/types';

export default function useFetchDetails(
  params: FetchDetailsParams
): UseFetchDetailsReturn {
  const { data, isLoading, error, isFetching } = useFetchCardDetailsQuery(
    params,
    {
      skip: params.id === null,
    }
  );

  const errorCode = error
    ? 'status' in error && error.status === 404
      ? ERROR_CODES.NOT_FOUND
      : ERROR_CODES.UNKNOWN_ERROR
    : false;

  return {
    detailsCard: data,
    isLoading: isLoading || isFetching,
    errorCode,
  };
}
