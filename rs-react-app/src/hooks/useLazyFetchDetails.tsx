import { useSearchParams } from 'react-router';
import { ERROR_CODES, SEARCH_PARAMS } from '@/constants/routes';
import { useLazyFetchCardDetailsQuery } from '@/services/fetchAPI';
import { type UseFetchDetailsReturn } from '@/types/types';

export default function useLazyFetchDetails(): UseFetchDetailsReturn {
  const [, setSearchParams] = useSearchParams();

  const [trigger, { data, isLoading, error, isFetching }] =
    useLazyFetchCardDetailsQuery();

  const errorCode = error
    ? 'status' in error && error.status === 404
      ? ERROR_CODES.NOT_FOUND
      : ERROR_CODES.UNKNOWN_ERROR
    : false;

  const updateDetails: UseFetchDetailsReturn['updateDetails'] = (id) => {
    if (id) {
      setSearchParams({ details: id });
      trigger(id);
    } else {
      setSearchParams((prev) => {
        prev.delete(SEARCH_PARAMS.DETAILS);
        return prev;
      });
    }
  };

  return {
    detailsCard: data,
    updateDetails,
    isLoading: isLoading || isFetching,
    errorCode,
  };
}
