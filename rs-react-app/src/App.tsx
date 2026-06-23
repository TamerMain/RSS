import { Routes, Route, Outlet, Navigate } from 'react-router';

import SearchBar from './pages/search/SearchBar.tsx';
import SearchResults from './pages/search/SearchResults.tsx';
import About from './pages/about/About.tsx';
import Navigation from './components/Navigation.tsx';
import NotFound from './pages/404/NotFound.tsx';
import { ROUTES } from '@/constants/routes.ts';

import { ThemeProvider } from '@/contexts/ThemeProvider.tsx';
import { store } from '@/store/store.ts';
import { Provider } from 'react-redux';
import { ROUTES } from '@/constants/routes.ts';

function App() {
  return (
    <div className="h-full min-h-[100vh] light:bg-mist-100">
      <Navigation />
      <div className="relative flex flex-col justify-center gap-3 w-3/4 mx-auto p-[2vh] light:bg-mist-200 transition-height">
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={<Navigate to={ROUTES.SEARCH.BASE} replace />}
          />
          <Route
            path={ROUTES.SEARCH.BASE}
            element={
              <>
                <SearchBar />
                <Outlet />
              </>
            }
          >
            <Route
              index
              element={<Navigate to={ROUTES.SEARCH.CHILDREN.CARDS} replace />}
            />
            <Route
              path={ROUTES.SEARCH.CHILDREN.CARDS}
              element={<SearchResults />}
            />
          </Route>
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
