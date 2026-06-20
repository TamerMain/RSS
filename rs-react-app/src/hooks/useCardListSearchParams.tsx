'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SEARCH_PARAMS } from '@/constants/routes';
import { type FetchSearchParams } from '@/types/types';

export default function useCardListSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentParams: FetchSearchParams = {
    [SEARCH_PARAMS.QUERY]: searchParams?.get(SEARCH_PARAMS.QUERY) || '',
    [SEARCH_PARAMS.PAGE]: Number(searchParams?.get(SEARCH_PARAMS.PAGE)) || 1,
  };

  const updateParams = (newParams: FetchSearchParams) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set(SEARCH_PARAMS.QUERY, newParams[SEARCH_PARAMS.QUERY]);
    params.set(SEARCH_PARAMS.PAGE, String(newParams[SEARCH_PARAMS.PAGE]));
    router.replace(`${pathname}?${params.toString()}`);
  };

  return { searchParams: currentParams, setSearchParams: updateParams };
}
