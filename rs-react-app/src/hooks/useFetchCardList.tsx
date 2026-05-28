import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import {
  searchRequest,
  type SearchResponse,
} from '../services/fetchCardList.tsx';
import { createCardSearchParams } from '@/utils/getParams.ts';
import { NAVIGATION, ERROR_CODES } from '@/constants/routes';

export type ErrorCode = '404' | 'UnknownError' | false;
export type SearchQuery = {
  q?: string | '';
  page?: number | 1;
};

export default function useFetchCardList() {
  const [cardList, setCardList] = useState<SearchResponse | null>(null);
  const [errorCode, setErrorCode] = useState<ErrorCode>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const updateCardList = useCallback(
    async ({ q = '', page = 1 }: SearchQuery) => {
      setErrorCode(false);
      setIsLoading(true);
      try {
        const cardList = await searchRequest(q, page);
        navigate({
          pathname: NAVIGATION.SEARCH.CARDS,
          search: createCardSearchParams({
            q: q,
            page: page,
          }),
        });
        window.setTimeout(() => {
          setCardList(cardList);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setCardList(null);
        if (err instanceof Error && err.message === ERROR_CODES.NOT_FOUND) {
          setErrorCode(ERROR_CODES.NOT_FOUND);
        } else {
          setErrorCode(ERROR_CODES.UNKNOWN_ERROR);
        }
        setIsLoading(false); 
        navigate(NAVIGATION.SEARCH.CARDS_NOT_FOUND);
      }
    },
    [navigate]
  );

  return { cardList, updateCardList, isLoading, errorCode };
}
