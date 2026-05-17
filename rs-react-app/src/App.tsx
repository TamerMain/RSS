import { useState } from 'react';
import { useNavigate, Routes, Route, NavLink, Outlet } from 'react-router';
import { searchRequest } from './services/fetchCardList.tsx';
import type { SearchResponse } from './services/fetchCardList.tsx';

import SearchBar from './components/SearchBar.tsx';
import SearchResults from './pages/search/SearchResults.tsx';
import About from './pages/about/About.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import ErrorButton from './components/ErrorButton.tsx';
import Page404 from './pages/404/Page404.tsx';

function App() {
  const [resultList, setResultList] = useState<SearchResponse | null>(null);
  const [isError, setIsError] = useState<'404' | 'UnknownError' | false>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let navigate = useNavigate();

  async function updateResultList(
    currentTerm: string,
    currentPage: number = 1
  ) {
    setIsError(false);
    setIsLoading(true);

    try {
      const cardList = await searchRequest(currentTerm, currentPage);
      window.setTimeout(() => {
        navigate(
          `/search?q=${encodeURIComponent(currentTerm)}&page=${currentPage}`,
          { replace: true }
        );
        setResultList(cardList);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      navigate('search/404', { replace: true });
      setResultList(null);
      if (err instanceof Error && err.message === '404') {
        setIsError('404');
      } else {
        setIsError('UnknownError');
      }

      setIsLoading(false);
    }
  }

  const loading = (
    <h1 className="flex justify-center p-2 text-xl">
      <span className="animate-spin w-6 h-6 text-center">⟡ </span>
      Loading
      <span className="animate-spin w-6 h-6 text-center"> ⟡</span>
    </h1>
  );

  return (
    <ErrorBoundary>
      <nav className="absolute my-2.5 gap-1 flex flex-col text-center">
        <NavLink
          to="search"
          className={({ isActive }) => {
            return `p-2 bg-mist-800 ${isActive ? 'text-gray-50' : 'text-gray-400'} hover:text-gray-50  cursor-pointer max-w-30`;
          }}
        >
          Search
        </NavLink>
        <NavLink
          to="about"
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
            path="search"
            element={
              <>
                <SearchBar
                  isLoading={isLoading}
                  updateResultList={updateResultList}
                />
                {isLoading && loading}
                <Outlet />
              </>
            }
          >
            <Route
              index
              element={
                <SearchResults
                  isLoading={isLoading}
                  resultList={resultList}
                  updateResultList={updateResultList}
                />
              }
            ></Route>
            <Route path="404" element={<Page404 isError={isError} />}></Route>
          </Route>
          <Route path="about" element={<About />}></Route>
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
