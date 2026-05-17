import { useState } from 'react';
import { useSearchParams } from 'react-router';
import {
  detailsRequest,
  type DetailsResponse,
} from '../services/fetchCardDetails';

export default function useFetchCard() {
  const [resultCard, setResultCard] = useState<DetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<'404' | 'UnknownError' | false>(false);
  const [, setSearchParams] = useSearchParams();

  async function updateResultCard(id: string) {
    setIsError(false);
    setIsLoading(true);
    setSearchParams((prev) => {
      prev.delete('details');
      return prev;
    });

    try {
      const card = await detailsRequest(id);
      window.setTimeout(() => {
        setResultCard(card);
        setSearchParams((prev) => {
          prev.set('details', encodeURIComponent(card?.name));
          return prev;
        });
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
  }
  return { resultCard, updateResultCard, setSearchParams, isLoading, isError };
}
