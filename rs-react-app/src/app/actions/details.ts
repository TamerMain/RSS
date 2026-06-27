'use server';

import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { SEARCH_PARAMS } from '@/constants/routes';

export async function detailsAction(formData: FormData) {
  const locale = await getLocale();

  const currentParams = {
    [SEARCH_PARAMS.QUERY]: formData?.get(SEARCH_PARAMS.QUERY) as string,
    [SEARCH_PARAMS.PAGE]: formData?.get(SEARCH_PARAMS.PAGE) as string,
    [SEARCH_PARAMS.DETAILS]: formData?.get(SEARCH_PARAMS.DETAILS) as string,
  };

  const params = new URLSearchParams(currentParams);

  redirect(`/${locale}/search/cards?${params.toString()}`);
}
