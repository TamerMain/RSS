import { useState } from 'react';
import { useSearchParams, Routes, Route, NavLink, Outlet } from 'react-router';
import { searchRequest } from './services/fetchCardList.tsx';
import type { SearchResponse } from './services/fetchCardList.tsx';

import SearchBar from './components/SearchBar.tsx';
import SearchResults from './components/SearchResults.tsx';
import About from './components/About.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import ErrorButton from './components/ErrorButton.tsx';

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
        setSearchParams(() => {
          const newParams = new URLSearchParams();
          if (currentTerm) newParams.set('q', currentTerm);
          newParams.set('page', `${currentPage}`);
          return newParams;
        });

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
      <nav className="absolute my-2.5 flex flex-col gap-1 text-center">
        <NavLink
          to="/search"
          className={({ isActive }) => {
            return `p-2 bg-mist-800 ${isActive ? 'text-gray-50' : 'text-gray-400'} hover:text-gray-50  cursor-pointer max-w-30`;
          }}
        >
          Search
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => {
            return `p-2 bg-mist-800 ${isActive ? 'text-gray-50' : 'text-gray-400'} hover:text-gray-50  cursor-pointer max-w-30`;
          }}
        >
          About
        </NavLink>
        <ErrorButton />
      </nav>
      <div className="relative flex flex-col justify-center gap-3 w-3/4 mx-auto my-5 p-3">
        <Routes>
          <Route
            path="/search"
            element={
              <>
                <SearchBar
                  isLoading={isLoading}
                  updateResultList={updateResultList}
                />
                <Outlet />
              </>
            }
          >
            <Route
              index
              element={
                <SearchResults
                  isLoading={isLoading}
                  isError={isError}
                  resultList={resultList}
                  updateResultList={updateResultList}
                />
              }
            ></Route>
            <Route path="404"></Route>
          </Route>
          <Route path="About" element={<About />}></Route>
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
