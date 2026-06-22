'use client';

import { useTranslations } from 'next-intl';
import { revalidateCacheTag } from '@/app/actions/cache';
import { CACHE_TAG } from '@/constants/routes';

type RefreshCacheButtonProps = {
  tag: (typeof CACHE_TAG)[keyof typeof CACHE_TAG];
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
