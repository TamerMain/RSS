'use client';

import { useActionState } from 'react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import useStorage from '../../../../hooks/useStorage';
import { searchAction } from '@/app/actions/search';
import { SEARCH_PARAMS } from '@/constants/routes';

function SearchBar() {
  const t = useTranslations('SearchBar');
  const { getItem: getRecentSearch, setItem: setRecentSearch } =
    useStorage('RecentSearch');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [, formAction, isPending] = useActionState(searchAction, null);

  useEffect(() => {
    setSearchTerm(getRecentSearch() || '');
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.currentTarget.value);
  }

  function handleSearchSubmit() {
    const newTerm = searchTerm.trim();
    if (newTerm !== getRecentSearch()) {
      setRecentSearch(newTerm);
    }
  }

  return (
    <form
      action={formAction}
      onSubmit={handleSearchSubmit}
      className="flex justify-center gap-1 pb-3 border-b-1 border-mist-800"
    >
      <input
        name={SEARCH_PARAMS.QUERY}
        className="w-full p-2 bg-mist-800 outline-none"
        type="search"
        placeholder={t('placeholder')}
        value={searchTerm}
        onChange={handleInputChange}
        disabled={isPending}
      />
      <button
        className="p-2 bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-400"
        type="submit"
        disabled={isPending}
      >
        {t('searchButton')}
      </button>
    </form>
  );
}

export default SearchBar;
