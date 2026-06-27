'use client';

import { createNavigation } from 'next-intl/navigation';
import { useTranslations } from 'next-intl';
import useStorage from '@/hooks/useStorage';
import { NAVIGATION } from '@/constants/routes';

export default function NotFound() {
  const t = useTranslations('NotFound');
  const { setItem: setRecentSearch } = useStorage('RecentSearch');

  const { Link } = createNavigation();

  function handleHomePageClick() {
    setRecentSearch('');
  }

  return (
    <div className="flex flex-col items-center gap-4 p-5">
      <h1 className="p-2 text-5xl light:text-black">{t('title')}</h1>
      <Link
        href={NAVIGATION.HOME}
        className="p-3 text-xl bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-400"
        onClick={handleHomePageClick}
      >
        {t('button')}
      </Link>
    </div>
  );
}
