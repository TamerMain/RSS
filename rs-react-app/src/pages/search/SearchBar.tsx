import { useState, useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import { type FetchSearchParams } from '@/types/types.ts';
import { getInitialParams } from '@/utils/getInitialParams';

type SearchBarProps = {
  isLoading: boolean;
  updateCardList: ({ q, page }: FetchSearchParams) => void;
};

function SearchBar(props: SearchBarProps) {
  const { getItem: getRecentSearch, setItem: setRecentSearch } =
    useStorage('RecentSearch');
  const [searchTerm, setSearchTerm] = useState<string>(() => getRecentSearch());

  useEffect(() => {
    const params = getInitialParams();
    const updateCardList = props.updateCardList;

    if (params) {
      updateCardList({
        q: params.q,
        page: params.page,
      });
      setRecentSearch(params.q);
    } else {
      const newTerm = getRecentSearch();
      updateCardList({ q: newTerm, page: 1 });
    }
  }, [getRecentSearch, setRecentSearch, props.updateCardList]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.currentTarget.value);
  }

  function handleSearchSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTerm = searchTerm.trim();
    if (getRecentSearch() === newTerm) {
      return;
    }
    setRecentSearch(newTerm);
    props.updateCardList({ q: newTerm, page: 1 });
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
          disabled={props.isLoading}
        ></input>
        <button
          className="p-2 bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-400"
          type="submit"
          disabled={props.isLoading}
        >
          Find Cards
        </button>
      </form>
    </>
  );
}

export default SearchBar;
