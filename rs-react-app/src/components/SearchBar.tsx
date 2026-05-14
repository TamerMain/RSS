import { useState, useEffect } from 'react';

function SearchBar(props: {
  isLoading: boolean;
  updateResultList: (currentTerm: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('RecentSearch') || ''
  );

  useEffect(() => {
    if (localStorage.getItem('RecentSearch') === null) {
      localStorage.setItem('RecentSearch', '');
    }
    const currentTerm = searchTerm.trim();
    props.updateResultList(currentTerm);
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.currentTarget.value);
  }

  function handleSearchSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const currentTerm = searchTerm.trim();
    if (currentTerm !== localStorage.getItem('RecentSearch')) {
      localStorage.setItem('RecentSearch', currentTerm);
    } else {
      return;
    }
    props.updateResultList(currentTerm);
  }

  return (
    <>
      <form className="flex justify-center gap-1" onSubmit={handleSearchSubmit}>
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
          className="p-2 bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400"
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
