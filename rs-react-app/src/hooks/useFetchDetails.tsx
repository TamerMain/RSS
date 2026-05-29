import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { createCardSearchParams } from '@/utils/createCardSearchParams';
import { NAVIGATION, ERROR_CODES } from '@/constants/routes';
import { useFetchCardDetailsQuery } from '@/services/fetchAPI';

export type ErrorCode = '404' | 'UnknownError' | false;

export default function useFetchDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cardId, setCardId] = useState<string | null>(null);

  const {
    data: detailsCard,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useFetchCardDetailsQuery(cardId || '', {
    skip: !cardId,
  });

  const errorCode = error
    ? 'status' in error && error.status === 404
      ? ERROR_CODES.NOT_FOUND
      : ERROR_CODES.UNKNOWN_ERROR
    : false;

  const updateDetailsCard = useCallback(
    async (id: string) => {
      setCardId(id);

      navigate({
        pathname: NAVIGATION.SEARCH.CARDS,
        search: createCardSearchParams({
          location: location.search,
          details: id,
        }),
      });
    },
    [navigate, location.search]
  );

  return {
    detailsCard,
    updateDetailsCard,
    isLoading: isLoading || isFetching,
    errorCode,
    refetch,
  };
}
