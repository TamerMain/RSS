import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { detailsRequest, type DetailsResponse } from '../services/fetchDetails';
import { createCardSearchParams } from '@/utils/getParams';
import { NAVIGATION, ERROR_CODES } from '@/constants/routes';

export type ErrorCode = '404' | 'UnknownError' | false;

export default function useFetchDetails() {
  const [detailsCard, setDetailsCard] = useState<DetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<ErrorCode>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const locationRef = useRef(location);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  const updateDetailsCard = useCallback(
    async (id: string) => {
      setErrorCode(false);
      setIsLoading(true);

      try {
        const card = await detailsRequest(id);
        navigate({
          pathname: NAVIGATION.SEARCH.CARDS,
          search: createCardSearchParams({
            location: locationRef.current.search,
            details: card.id,
          }),
        });
        window.setTimeout(() => {
          setDetailsCard(card);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setDetailsCard(null);
        if (err instanceof Error && err.message === ERROR_CODES.NOT_FOUND) {
          setErrorCode(ERROR_CODES.NOT_FOUND);
        } else {
          setErrorCode(ERROR_CODES.UNKNOWN_ERROR);
        }

        setIsLoading(false);
      }
    },
    [navigate]
  );
  return { detailsCard, updateDetailsCard, navigate, isLoading, errorCode };
}
