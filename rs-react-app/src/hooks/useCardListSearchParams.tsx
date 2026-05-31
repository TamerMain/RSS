import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { SEARCH_PARAMS } from '@/constants/routes';
import { type FetchSearchParams } from '@/types/types';
import useStorage from './useStorage';

export default function useCardListSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getItem: getRecentSearch, setItem: setRecentSearch } =
    useStorage('RecentSearch');

  const currentParams: FetchSearchParams = {
    [SEARCH_PARAMS.QUERY]:
      searchParams.get(SEARCH_PARAMS.QUERY) || getRecentSearch() || '',
    [SEARCH_PARAMS.PAGE]: Number(searchParams.get(SEARCH_PARAMS.PAGE)),
  };

  useEffect(() => {
    if (
      !searchParams.has(SEARCH_PARAMS.QUERY) ||
      !searchParams.has(SEARCH_PARAMS.PAGE)
    ) {
      if (getRecentSearch()) {
        setSearchParams((prev) => {
          prev.set('q', getRecentSearch());
          prev.set('page', String(1));
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          prev.set('q', String(''));
          prev.set('page', String(1));
          return prev;
        });
      }
    }
    if (
      searchParams.has(SEARCH_PARAMS.QUERY) &&
      searchParams.has(SEARCH_PARAMS.PAGE) &&
      searchParams.get(SEARCH_PARAMS.QUERY) === ''
    ) {
      setRecentSearch('');
    }
  });

  const updateParams = (newParams: FetchSearchParams) => {
    setSearchParams((prev) => {
      prev.set(SEARCH_PARAMS.QUERY, newParams.q);
      prev.set(SEARCH_PARAMS.PAGE, String(newParams.page));
      return prev;
    });
  };

  return { searchParams: currentParams, setSearchParams: updateParams };
}
