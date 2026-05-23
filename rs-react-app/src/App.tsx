import { useState } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router';
import useFetchList from './hooks/useFetchList.tsx';
import SearchBar from './pages/search/SearchBar.tsx';
import SearchResults from './pages/search/SearchResults.tsx';
import About from './pages/about/About.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import Navigation from './components/Navigation.tsx';
import CardNotFound from './pages/search/cardnotfound/CardNotFound.tsx';
import NotFound from './pages/404/NotFound.tsx';
import { ThemeProvider } from '@/contexts/ThemeContext.tsx';

function App() {
  const { resultList, updateResultList, isLoading, isError } = useFetchList();

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="h-full min-h-[100vh]">
          <Navigation />
          <div className="relative flex flex-col justify-center gap-3 w-3/4 mx-auto py-[2vh]">
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
                <Route
                  path="cardnotfound"
                  element={
                    <CardNotFound
                      isError={isError}
                      updateResultList={updateResultList}
                    />
                  }
                ></Route>
              </Route>
              <Route path="about" element={<About />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
