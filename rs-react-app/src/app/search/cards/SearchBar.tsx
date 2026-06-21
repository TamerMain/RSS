'use client';

import { useState, useEffect } from 'react';
import useStorage from '../../../hooks/useStorage';
import useClientSearchParams from '@/hooks/useClientSearchParams';
import { SEARCH_PARAMS } from '@/constants/routes';

function SearchBar() {
  const { getItem: getRecentSearch, setItem: setRecentSearch } =
    useStorage('RecentSearch');
  const { searchParams, setSearchParams } = useClientSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (!searchParams[SEARCH_PARAMS.QUERY] && !getRecentSearch()) {
      setSearchParams({
        [SEARCH_PARAMS.QUERY]: '',
        [SEARCH_PARAMS.PAGE]: 1,
      });
    }

    if (!searchParams[SEARCH_PARAMS.QUERY] && getRecentSearch()) {
      setSearchParams({
        [SEARCH_PARAMS.QUERY]: getRecentSearch(),
        [SEARCH_PARAMS.PAGE]: 1,
      });
    }

    setSearchTerm(searchParams[SEARCH_PARAMS.QUERY] || getRecentSearch() || '');
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.currentTarget.value);
  }

  function handleSearchSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTerm = searchTerm.trim();
    if (newTerm === getRecentSearch()) {
      return;
    }
    setRecentSearch(newTerm);
    setSearchParams({
      [SEARCH_PARAMS.QUERY]: newTerm,
      [SEARCH_PARAMS.PAGE]: 1,
    });
  }

  return (
    <>
      <form
        className="flex justify-center gap-1 pb-3 border-b-1 border-mist-800"
        onSubmit={handleSearchSubmit}
      >
        <input
          name="search term"
          className="w-full p-2 bg-mist-800 outline-none"
          type="search"
          placeholder="Example: Black Lotus or Lotus"
          value={searchTerm}
          onChange={handleInputChange}
        ></input>
        <button
          className="p-2 bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-400"
          type="submit"
        >
          Find Cards
        </button>
      </form>
    </>
  );
}

export default SearchBar;
