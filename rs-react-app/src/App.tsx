import { Routes, Route, Outlet, Navigate } from 'react-router';

import useFetchList from './hooks/useFetchList.tsx';

import SearchBar from './pages/search/SearchBar.tsx';
import SearchResults from './pages/search/SearchResults.tsx';
import About from './pages/about/About.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import Navigation from './components/Navigation.tsx';
import Page404 from './pages/search/404/Page404.tsx';

function App() {
  const { resultList, updateResultList, isLoading, isError } = useFetchList();

  return (
    <ErrorBoundary>
      <Navigation />
      <div className="relative flex flex-col justify-center gap-3 w-3/4 mx-auto my-5 p-3">
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route
            path="search"
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
                  resultList={resultList}
                  updateResultList={updateResultList}
                />
              }
            ></Route>
            <Route path="404" element={<Page404 isError={isError} updateResultList={updateResultList}/>}></Route>
          </Route>
          <Route path="about" element={<About />}></Route>
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
