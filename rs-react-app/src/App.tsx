import { useEffect, useState } from 'react';
import { searchRequest } from './services/searchRequestApi.tsx';
import type { SearchResponse } from './services/searchRequestApi.tsx';

import CardItem from './components/CardItem.tsx';
import SearchBar from './components/SearchBar.tsx';
import SearchStatusBar from './components/SearchStatusBar.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

function App() {
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem('RecentSearch') || ''
  );
  const [resultList, setResultList] = useState<SearchResponse | null>(null);
  const [isError, setIsError] = useState<'404' | 'UnknownError' | false>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function updateResultList(currentInput: string) {
    setIsError(false);
    setIsLoading(true);

    try {
      const cardList = await searchRequest(currentInput);
      setTimeout(() => {
        setResultList(cardList);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      if (err instanceof Error && err.message === '404') {
        setResultList(null);
        setIsError('404');
        setIsLoading(false);
      } else {
        setResultList(null);
        setIsError('UnknownError');
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    const currentInput = searchValue.trim();
    updateResultList(currentInput);
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.currentTarget.value);
  }

  function handleSearchSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const currentInput = searchValue.trim();
    if (currentInput !== localStorage.getItem('RecentSearch')) {
      localStorage.setItem('RecentSearch', currentInput);
    } else {
      return;
    }
    updateResultList(currentInput);
  }

  return (
    <ErrorBoundary>
      <div className="relative flex flex-col justify-center gap-3 w-2/4 mx-auto my-5 p-3">
        <SearchBar
          searchValue={searchValue}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSearchSubmit={handleSearchSubmit}
        />
        <div className="flex flex-col gap-3  border-t-1 border-b-1 border-mist-800">
          <SearchStatusBar isLoading={isLoading} isError={isError} />
          <div className="grid grid-cols-5 justify-items-center gap-4 p-2">
            {resultList &&
              resultList.data?.map((card) => (
                <CardItem
                  key={card.id}
                  cardImageSrc={
                    card?.image_uris?.normal ||
                    card?.card_faces?.[0]?.image_uris?.normal
                  }
                  cardName={card.name}
                />
              ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
