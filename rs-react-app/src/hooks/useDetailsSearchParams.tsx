import { useSearchParams } from 'react-router';
import { SEARCH_PARAMS } from '@/constants/routes';
import { type FetchDetailsParams } from '@/types/types';

export default function useDetailsSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentParams: FetchDetailsParams = {
    [SEARCH_PARAMS.DETAILS]: searchParams.get(SEARCH_PARAMS.DETAILS),
  };

  const updateParams = (newParams: FetchDetailsParams) => {
    setSearchParams((prev) => {
      if (
        currentParams[SEARCH_PARAMS.DETAILS] ===
        newParams[SEARCH_PARAMS.DETAILS]
      ) {
        return prev;
      }
      if (newParams[SEARCH_PARAMS.DETAILS] !== null)
        prev.set(
          SEARCH_PARAMS.DETAILS,
          String(newParams[SEARCH_PARAMS.DETAILS])
        );
      if (newParams[SEARCH_PARAMS.DETAILS] === null) {
        prev.delete(SEARCH_PARAMS.DETAILS);
      }
      return prev;
    });
  };

  return { searchParams: currentParams, setSearchParams: updateParams };
}
