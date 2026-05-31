import { useFetchCardListQuery } from '@/services/fetchAPI.ts';
import {
  type FetchSearchParams,
  type UseFetchCardListReturn,
  type FetchError,
} from '@/types/types.ts';
import { ERROR_CODES } from '@/constants/routes';

export default function useFetchCardList({
  q,
  page,
}: FetchSearchParams): UseFetchCardListReturn {
  const { data, isLoading, error, isFetching } = useFetchCardListQuery(
    {
      q,
      page,
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
      case 404:
        return ERROR_CODES.NOT_FOUND;
      case 422:
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
