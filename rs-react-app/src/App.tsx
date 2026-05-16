import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { searchRequest } from './services/fetchCardList.tsx';
import type { SearchResponse } from './services/fetchCardList.tsx';

import SearchBar from './components/SearchBar.tsx';
import SearchResults from './components/SearchResults.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

function App() {
  const [resultList, setResultList] = useState<SearchResponse | null>(null);
  const [isError, setIsError] = useState<'404' | 'UnknownError' | false>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();

  async function updateResultList(
    currentTerm: string,
    currentPage: number = 1
  ) {
    setIsError(false);
    setIsLoading(true);

    try {
      const cardList = await searchRequest(currentTerm, currentPage);
      window.setTimeout(() => {
        setResultList(cardList);
        setSearchParams(
          `?page=${currentPage}${currentTerm ? '&q=' + currentTerm : ''}`
        );

        setIsLoading(false);
      }, 500);
    } catch (err) {
      setResultList(null);
      if (err instanceof Error && err.message === '404') {
        setIsError('404');
      } else {
        setIsError('UnknownError');
      }

      setIsLoading(false);
    }
  }

  return (
    <ErrorBoundary>
      <div className="relative flex flex-col justify-center gap-3 w-3/4 mx-auto my-5 p-3">
        <SearchBar isLoading={isLoading} updateResultList={updateResultList} />
        <SearchResults
          isLoading={isLoading}
          isError={isError}
          resultList={resultList}
          updateResultList={updateResultList}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
