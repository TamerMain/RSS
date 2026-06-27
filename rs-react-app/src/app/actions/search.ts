'use server';

import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { SEARCH_PARAMS } from '@/constants/routes';

type SearchState = {
  query: string;
};

export async function searchAction(
  _prevState: SearchState | null,
  formData: FormData
): Promise<SearchState> {
  const locale = await getLocale();
  const query = formData.get(SEARCH_PARAMS.QUERY) as string;

  if (!query || query.trim().length === 0) {
    const params = new URLSearchParams({
      [SEARCH_PARAMS.QUERY]: '',
      [SEARCH_PARAMS.PAGE]: '1',
    });
    redirect(`/${locale}/search/cards?${params.toString()}`);
  }

  const params = new URLSearchParams({
    [SEARCH_PARAMS.QUERY]: query.trim(),
    [SEARCH_PARAMS.PAGE]: '1',
  });

  redirect(`/${locale}/search/cards?${params.toString()}`);
}
