'use client';

import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';
import { type CardInfo } from '@/store/cartSlice';
import { exportCSVAction } from '@/app/actions/csvActions';

function DownloadButton({ cart }: { cart: CardInfo[] }) {
  const t = useTranslations('Cart');
  const [state, formAction, isPending] = useActionState(exportCSVAction, null);

  useEffect(() => {
    if (state?.success && state.content) {
      const blob = new Blob([state.content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = state.filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center gap-2">
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
