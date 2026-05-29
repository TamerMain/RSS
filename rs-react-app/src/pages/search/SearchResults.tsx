import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { SEARCH_PARAMS, ERROR_CODES } from '@/constants/routes.ts';
import useStorage from '@/hooks/useStorage.tsx';
import CardPagination from './cards/CardPagination.tsx';
import CardList from './cards/CardList.tsx';
import CardNotFound from './cards/CardNotFound.tsx';
import Loader from '../../components/Loader.tsx';
import useLazyFetchCardList from '@/hooks/useLazyFetchCardList.tsx';

function SearchResults() {
  const { cardList, updateCardList, errorCode, isLoading } =
    useLazyFetchCardList();
  const { getItem: getRecentSearch, setItem: setRecentSearch } =
    useStorage('RecentSearch');
  const [searchParams] = useSearchParams();
  const q = searchParams.get(SEARCH_PARAMS.QUERY) || getRecentSearch();
  const page = Number(searchParams.get(SEARCH_PARAMS.PAGE)) || 1;

  useEffect(() => {
    if (page) {
      setRecentSearch(q);
      updateCardList({ q, page });
    }
  }, [q, page, updateCardList, setRecentSearch]);

  if (isLoading) return <Loader />;

  if (errorCode)
    return (
      <CardNotFound errorCode={errorCode} updateCardList={updateCardList} />
    );

  if (cardList) {
    return (
      <div className="flex flex-col fade-in">
        <h1 className="flex justify-center p-2 text-5xl light:text-black">
          Card List
        </h1>
        <CardPagination cardList={cardList} updateCardList={updateCardList} />
        <CardList cardList={cardList} />
      </div>
    );
  }

  return (
    <CardNotFound
      errorCode={ERROR_CODES.UNKNOWN_ERROR}
      updateCardList={updateCardList}
    />
  );
}

export default SearchResults;
