import { Routes, Route, Outlet, Navigate } from 'react-router';

import SearchBar from './pages/search/SearchBar.tsx';
import SearchResults from './pages/search/SearchResults.tsx';
import About from './pages/about/About.tsx';
import Navigation from './components/Navigation.tsx';
import CardNotFound from './pages/search/cards-not-found/CardNotFound.tsx';
import NotFound from './pages/404/NotFound.tsx';
import { ROUTES, NAVIGATION } from '@/constants/routes.ts';

function App() {
  return (
    <div className="h-full min-h-[100vh] light:bg-mist-100">
      <Navigation />
      <div className="relative flex flex-col justify-center gap-3 w-3/4 mx-auto p-[2vh] light:bg-mist-200 transition-height">
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={<Navigate to={NAVIGATION.SEARCH.BASE} replace />}
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
              path={ROUTES.SEARCH.CHILDREN.CARDS}
              element={<SearchResults />}
            ></Route>
            <Route
              path={ROUTES.SEARCH.CHILDREN.CARDS_NOT_FOUND}
              element={<CardNotFound />}
            ></Route>
          </Route>
          <Route path={ROUTES.ABOUT} element={<About />}></Route>
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
