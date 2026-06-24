<<<<<<< HEAD
'use client';

import { useTranslations } from 'next-intl';
import { useTransition, useState } from 'react';
import { type CardInfo } from '@/store/cartSlice';
import { exportCSVAction } from '@/app/actions/csvActions';

function DownloadButton({ cart }: { cart: CardInfo[] }) {
  const t = useTranslations('Cart');
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
=======
import { type CardInfo } from '@/store/store';
import { SEARCH_PARAMS, NAVIGATION } from '@/constants/routes';

function detailsURL(search: string, page: number, id: string) {
  const origin = window.location.origin;
  const URL = `${origin}${NAVIGATION.SEARCH.CARDS}?q=${encodeURIComponent(search ? search : '')}&${SEARCH_PARAMS.PAGE}=${page}&${SEARCH_PARAMS.DETAILS}=${id}`;
  return URL;
}

function DownloadButton(props: { cart: CardInfo[] }) {
  function handleDownload() {
    if (props.cart.length === 0) return;
    const contentHeader =
      'This file contains your selected card information.\r\nSuch as Name, ID and Description link to original art and details URL which is not impelemented yet for direct access from browser.\r\n\r\n';
    const contentBody = props.cart
      .map((item, index) => {
        return `------- Card ${index + 1} -------\r\nName: ${item.name}\r\nScryfall unique ID: ${item.id}\r\nOriginal Art: ${item.imageSrc ? item.imageSrc : 'No art available'}\r\nDetails URL: ${detailsURL(item.search, item.page, item.id)}.\r\n`;
      })
      .join('\r\n');
    const content = `${contentHeader + contentBody}`;
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
>>>>>>> main

  const handleDownload = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('cartItems', JSON.stringify(cart));

      const result = await exportCSVAction(null, formData);

      if (result?.success && result.content) {
        const blob = new Blob([result.content], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = result.filename || 'cards.csv';
        a.click();
        URL.revokeObjectURL(url);

        setMessage({
          type: 'success',
          text: t('downloadSuccess'),
        });
      } else if (result?.error) {
        setMessage({ type: 'error', text: result.error });
      }

      setTimeout(() => setMessage(null), 2000);
    });
  };

  return (
    <div className="flex flex-col w-full items-center gap-2">
      {message && (
        <div className={`text-sm light:text-black light:font-semibold`}>
          {message.text}
        </div>
      )}
      <button
        onClick={handleDownload}
        className="p-2 bg-mist-800 hover:text-gray-50 cursor-pointer transition-colors duration-400 disabled:opacity-50"
        disabled={isPending || !cart.length}
      >
        {t('download')}
      </button>
    </div>
  );
}

export default DownloadButton;
