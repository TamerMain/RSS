import { useState, useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import useFetchCardList from '@/hooks/useFetchCardList';
import useCardListSearchParams from '@/hooks/useCardListSearchParams';

function SearchBar() {
  const { getItem: getRecentSearch, setItem: setRecentSearch } =
    useStorage('RecentSearch');
  const { searchParams, setSearchParams } = useCardListSearchParams();
  const currentQuery = searchParams.q || '';
  const { isLoading } = useFetchCardList(searchParams);
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return getRecentSearch();
  });

  useEffect(() => {
    if (currentQuery || currentQuery === '') {
      setRecentSearch(currentQuery);
    }
  }, [currentQuery, setRecentSearch]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.currentTarget.value);
  }

  function handleSearchSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTerm = searchTerm.trim();
    setRecentSearch(newTerm);
    setSearchParams({ q: newTerm, page: 1 });
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
          disabled={isLoading}
        ></input>
        <button
          className="p-2 bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-400"
          type="submit"
          disabled={isLoading}
        >
          Find Cards
        </button>
      </form>
    </>
  );
}

export default SearchBar;
