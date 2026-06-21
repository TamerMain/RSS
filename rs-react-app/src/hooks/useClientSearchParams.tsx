'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { SEARCH_PARAMS } from '@/constants/routes';
import {
  type SearchParams,
  type FetchSearchParams,
  type FetchDetailsParams,
} from '@/types/types';

export default function useCardListSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentParams: SearchParams = {
    [SEARCH_PARAMS.QUERY]: searchParams?.get(SEARCH_PARAMS.QUERY) || '',
    [SEARCH_PARAMS.PAGE]: Number(searchParams?.get(SEARCH_PARAMS.PAGE)) || 1,
    [SEARCH_PARAMS.DETAILS]: searchParams?.get(SEARCH_PARAMS.DETAILS) || null,
  };

  const setSearchParams = (newParams: FetchSearchParams) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set(SEARCH_PARAMS.QUERY, newParams[SEARCH_PARAMS.QUERY]);
    params.set(SEARCH_PARAMS.PAGE, String(newParams[SEARCH_PARAMS.PAGE]));
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const setDetailsParams = (newParams: FetchDetailsParams) => {
    const params = new URLSearchParams(searchParams?.toString() || '');

    if (
      currentParams[SEARCH_PARAMS.DETAILS] === newParams[SEARCH_PARAMS.DETAILS]
    ) {
      return;
    }

    if (newParams[SEARCH_PARAMS.DETAILS] !== null) {
      params.set(
        SEARCH_PARAMS.DETAILS,
        String(newParams[SEARCH_PARAMS.DETAILS])
      );
    } else {
      params.delete(SEARCH_PARAMS.DETAILS);
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return {
    searchParams: currentParams,
    setSearchParams: setSearchParams,
    setDetailsParams: setDetailsParams,
    isLoading: isPending,
  };
}
