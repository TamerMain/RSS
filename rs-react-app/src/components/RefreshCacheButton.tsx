'use client';

import { useTranslations } from 'next-intl';
import { revalidateCacheTag } from '@/app/actions/cache';
import { type CacheTag } from '@/types/types';

type RefreshCacheButtonProps = {
  tag: CacheTag;
};

function RefreshCacheButton(props: RefreshCacheButtonProps) {
  const t = useTranslations('Navigation');

  async function handleRefreshCache() {
    await revalidateCacheTag(props.tag);
  }

  return (
    <button
      className="p-2 bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer transition-colors duration-400"
      onClick={handleRefreshCache}
    >
      {t(props.tag)}
    </button>
  );
}

export default RefreshCacheButton;
