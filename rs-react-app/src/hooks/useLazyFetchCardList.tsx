import { useSearchParams } from 'react-router';
import { useLazyFetchCardListQuery } from '@/services/fetchAPI.ts';
import {
  type FetchSearchParams,
  type UseFetchCardListReturn,
} from '@/types/types.ts';
import { ERROR_CODES } from '@/constants/routes';

export default function useLazyFetchCardList(): UseFetchCardListReturn {
  const [, setSearchParams] = useSearchParams();

  const [trigger, { data, isLoading, error, isFetching }] =
    useLazyFetchCardListQuery();

  const errorCode = error
    ? 'status' in error && error.status === 404
      ? ERROR_CODES.NOT_FOUND
      : ERROR_CODES.UNKNOWN_ERROR
    : false;

  function updateCardList({ q, page }: FetchSearchParams) {
    trigger({ q, page });
    setSearchParams({ q: q || '', page: page.toString() });
  }

  return {
    cardList: data,
    updateCardList,
    isLoading: isLoading || isFetching,
    errorCode,
  };
}
