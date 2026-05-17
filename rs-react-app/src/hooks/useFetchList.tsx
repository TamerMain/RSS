import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  searchRequest,
  type SearchResponse,
} from '../services/fetchCardList.tsx';

export default function useFetchList() {
  const [resultList, setResultList] = useState<SearchResponse | null>(null);
  const [isError, setIsError] = useState<'404' | 'UnknownError' | false>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let navigate = useNavigate();

  async function updateResultList(
    currentTerm: string,
    currentPage: number = 1
  ) {
    setIsError(false);
    setIsLoading(true);

    try {
      const cardList = await searchRequest(currentTerm, currentPage);
      window.setTimeout(() => {
        navigate(
          `/search?q=${encodeURIComponent(currentTerm)}&page=${currentPage}`,
          { replace: true }
        );
        setResultList(cardList);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      navigate('search/404', { replace: true });
      setResultList(null);
      if (err instanceof Error && err.message === '404') {
        setIsError('404');
      } else {
        setIsError('UnknownError');
      }

      setIsLoading(false);
    }
  }

  return { resultList, updateResultList, isLoading, isError };
}
