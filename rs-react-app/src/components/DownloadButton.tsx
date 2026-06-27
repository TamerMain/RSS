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
