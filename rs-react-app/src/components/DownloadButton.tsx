'use client';

import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useState } from 'react';
import { type CardInfo } from '@/store/cartSlice';
import { exportCSVAction } from '@/app/actions/csvActions';

function DownloadButton({ cart }: { cart: CardInfo[] }) {
  const t = useTranslations('Cart');
  const [state, formAction, isPending] = useActionState(exportCSVAction, null);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    if (state?.success && state.content) {
      const blob = new Blob([state.content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = state.filename;
      a.click();
      URL.revokeObjectURL(url);

      setMessage({
        type: 'success',
        text: 'Downloaded!',
      });
    }

    if (state?.error) {
      setMessage({ type: 'error', text: state.error });
    }
  }, [state]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="flex flex-col w-full items-center gap-2">
      {message && (
        <div className={`text-sm light:text-black light:font-semibold`}>
          {message.text}
        </div>
      )}
      <form action={formAction}>
        <input type="hidden" name="cartItems" value={JSON.stringify(cart)} />
        <button
          type="submit"
          className="p-2 bg-mist-800 hover:text-gray-50 cursor-pointer transition-colors duration-400 disabled:opacity-50"
          disabled={isPending || !cart.length}
        >
          {t('download')}
        </button>
      </form>
    </div>
  );
}

export default DownloadButton;
