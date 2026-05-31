import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { SEARCH_PARAMS } from '@/constants/routes';
import { type FetchSearchParams } from '@/types/types';

export default function useCardListSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const hasQuery = searchParams.has(SEARCH_PARAMS.QUERY);
    const hasPage = searchParams.has(SEARCH_PARAMS.PAGE);

    if (!hasQuery || !hasPage) {
      setSearchParams({
        [SEARCH_PARAMS.QUERY]: searchParams.get(SEARCH_PARAMS.QUERY) || '',
        [SEARCH_PARAMS.PAGE]: searchParams.get(SEARCH_PARAMS.PAGE) || '1',
      });
    }
  }, [setSearchParams]);

  const currentParams: FetchSearchParams = {
    [SEARCH_PARAMS.QUERY]: searchParams.get(SEARCH_PARAMS.QUERY) || '',
    [SEARCH_PARAMS.PAGE]: Number(searchParams.get(SEARCH_PARAMS.PAGE)),
  };

  const updateParams = (newParams: FetchSearchParams) => {
    setSearchParams((prev) => {
      if (newParams.q !== null) prev.set(SEARCH_PARAMS.QUERY, newParams.q);
      if (newParams.page !== null)
        prev.set(SEARCH_PARAMS.PAGE, String(newParams.page));
      return prev;
    });
  };

  return { searchParams: currentParams, setSearchParams: updateParams };
}
