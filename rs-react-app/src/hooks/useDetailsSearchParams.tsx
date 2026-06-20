'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SEARCH_PARAMS } from '@/constants/routes';
import { type FetchDetailsParams } from '@/types/types';

export default function useDetailsSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentParams: FetchDetailsParams = {
    [SEARCH_PARAMS.DETAILS]: searchParams?.get(SEARCH_PARAMS.DETAILS) || null,
  };

  const updateParams = (newParams: FetchDetailsParams) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    if (
      currentParams[SEARCH_PARAMS.DETAILS] === newParams[SEARCH_PARAMS.DETAILS]
    ) {
      return;
    }
    
    if (newParams[SEARCH_PARAMS.DETAILS] !== null) {
      params.set(SEARCH_PARAMS.DETAILS, String(newParams[SEARCH_PARAMS.DETAILS]));
    } else {
      params.delete(SEARCH_PARAMS.DETAILS);
    }
    
    router.replace(`${pathname}?${params.toString()}`);
  };

  return { searchParams: currentParams, setSearchParams: updateParams };
}