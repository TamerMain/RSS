'use client';

import { useActionState } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import useStorage from '../../../../hooks/useStorage';
import useClientSearchParams from '@/hooks/useClientSearchParams';
import { searchAction } from '@/app/actions/search';
import { SEARCH_PARAMS } from '@/constants/routes';

function SearchBar() {
  const t = useTranslations('SearchBar');
  const {
    getItem: getRecentSearch,
    setItem: setRecentSearch,
    isFirstLoad,
  } = useStorage('RecentSearch');
  const { searchParams, setSearchParams } = useClientSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [, formAction, isPending] = useActionState(searchAction, null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (isFirstLoad || hasInitialized.current) return;
    hasInitialized.current = true;

    const initialSearchParams = {
      [SEARCH_PARAMS.QUERY]: getRecentSearch || '',
      [SEARCH_PARAMS.PAGE]: 1,
    };

    console.log(initialSearchParams);

    if (
      searchParams[SEARCH_PARAMS.QUERY] ||
      searchParams[SEARCH_PARAMS.QUERY] === ''
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchTerm(searchParams[SEARCH_PARAMS.QUERY] as string);
      setRecentSearch(searchParams[SEARCH_PARAMS.QUERY] as string);
    }

    if (!searchParams[SEARCH_PARAMS.PAGE]) {
      if (searchParams[SEARCH_PARAMS.QUERY] === '') {
        return;
      } else if (!searchParams[SEARCH_PARAMS.QUERY]) {
        setSearchTerm(initialSearchParams[SEARCH_PARAMS.QUERY]);
        setSearchParams(initialSearchParams);
      }
    }
  }, [
    searchParams,
    setSearchParams,
    getRecentSearch,
    isFirstLoad,
    setRecentSearch,
  ]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.currentTarget.value);
  }

  function handleSearchSubmit() {
    const newTerm = searchTerm.trim();
    if (newTerm !== getRecentSearch) {
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
