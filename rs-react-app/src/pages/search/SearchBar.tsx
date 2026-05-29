import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useStorage from '../../hooks/useStorage';
import useLazyFetchCardList from '@/hooks/useLazyFetchCardList';
import { ROUTES } from '@/constants/routes';

function SearchBar() {
  const { getItem: getRecentSearch, setItem: setRecentSearch } =
    useStorage('RecentSearch');
  const [searchTerm, setSearchTerm] = useState<string>(() => getRecentSearch());
  const navigate = useNavigate();
  const { cardList, updateCardList, errorCode, isLoading } =
    useLazyFetchCardList();

  useEffect(() => {
    if (cardList) {
      navigate(ROUTES.SEARCH.CHILDREN.CARDS);
    }
    if (errorCode) {
      navigate(ROUTES.SEARCH.CHILDREN.CARDS_NOT_FOUND);
    }
  }, [navigate, cardList, errorCode]);

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
    updateCardList({ q: newTerm, page: 1 });
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
