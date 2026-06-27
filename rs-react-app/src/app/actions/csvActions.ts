'use server';

import { type CardInfo } from '@/store/cartSlice';
import { getTranslations } from 'next-intl/server';
import { NAVIGATION, SEARCH_PARAMS } from '@/constants/routes';

function generateDetailsURL(search: string, page: number, id: string) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';
  return `${baseURL}${NAVIGATION.SEARCH.CARDS}?${SEARCH_PARAMS.QUERY}=${search}&${SEARCH_PARAMS.PAGE}=${page}&${SEARCH_PARAMS.DETAILS}=${id}`;
}

type ActionState = {
  success: boolean;
  content?: string;
  filename?: string;
  error?: string;
} | null;

export async function exportCSVAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const t = await getTranslations('Cart');
  try {
    const cartItems: CardInfo[] = JSON.parse(
      formData.get('cartItems') as string
    );

    if (!cartItems?.length) {
      return { success: false, error: t('downloadEmpty') };
    }

    const headers = `${t('headers')}\r\n`;
    const rows = cartItems
      .map(
        (item) =>
          `"${item.name}",${item.id},"${item.imageSrc || t('noArt')}","${generateDetailsURL(item.search, item.page, item.id)}"`
      )
      .join('\r\n');

    const content = headers + rows;

    return {
      success: true,
      content,
      filename: `${cartItems.length}${t('fileName')}.csv`,
    };
  } catch {
    return { success: false, error: t('downloadError') };
  }
}
