import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  detailsRequest,
  type DetailsResponse,
} from '../services/fetchCardDetails';

export default function useFetchCard() {
  const [resultCard, setResultCard] = useState<DetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<'404' | 'UnknownError' | false>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const locationRef = useRef(location);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  const updateResultCard = useCallback(
    async (id: string) => {
      setIsError(false);
      setIsLoading(true);

      try {
        const card = await detailsRequest(id);
        const newParams = new URLSearchParams(locationRef.current.search);
        newParams.set('details', encodeURIComponent(card?.name));
        navigate({ pathname: '/search', search: newParams.toString() });
        window.setTimeout(() => {
          setResultCard(card);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setResultCard(null);
        if (err instanceof Error && err.message === '404') {
          setIsError('404');
        } else {
          setIsError('UnknownError');
        }

        setIsLoading(false);
      }
    },
    [navigate]
  );
  return { resultCard, updateResultCard, navigate, isLoading, isError };
}
