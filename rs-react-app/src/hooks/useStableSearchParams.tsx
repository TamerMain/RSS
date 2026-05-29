import { useCallback, useRef, useEffect } from 'react';
import { useSearchParams as useRouterSearchParams } from 'react-router';

export function useStableSearchParams() {
  const [searchParams, setSearchParams] = useRouterSearchParams();
  const setSearchParamsRef = useRef(setSearchParams);

  useEffect(() => {
    setSearchParamsRef.current = setSearchParams;
  }, [setSearchParams]);

  const stableSetSearchParams = useCallback(
    (...args: Parameters<typeof setSearchParams>) =>
      setSearchParamsRef.current(...args),
    []
  );

  return [searchParams, stableSetSearchParams] as const;
}
