import { useState } from 'react';
import { searchRequest } from './services/searchRequestApi.tsx';
import type { SearchResponse } from './services/searchRequestApi.tsx';

import SearchBar from './components/SearchBar.tsx';
import SearchResults from './components/SearchResults.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

function App() {
  const [resultList, setResultList] = useState<SearchResponse | null>(null);
  const [isError, setIsError] = useState<'404' | 'UnknownError' | false>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function updateResultList(
    currentTerm: string,
    currentPage: number = 1
  ) {
    setIsError(false);
    setIsLoading(true);

    try {
      const cardList = await searchRequest(currentTerm, currentPage);
      setResultList(cardList);
    } catch (err) {
      setResultList(null);
      if (err instanceof Error && err.message === '404') {
        setIsError('404');
      } else {
        setIsError('UnknownError');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ErrorBoundary>
      <div className="relative flex flex-col justify-center gap-3 w-2/4 mx-auto my-5 p-3">
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
