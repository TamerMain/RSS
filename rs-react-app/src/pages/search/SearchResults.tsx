import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { SEARCH_PARAMS } from '@/constants/routes.ts';
import CardPagination from './cards/CardPagination.tsx';
import CardList from './cards/CardList.tsx';
import Loader from '../../components/Loader.tsx';
import useLazyFetchCardList from '@/hooks/useLazyFetchCardList.tsx';

function SearchResults() {
  const { cardList, updateCardList, isLoading } = useLazyFetchCardList();
  const [searchParams] = useSearchParams();
  const q = searchParams.get(SEARCH_PARAMS.QUERY) || '';
  const page = Number(searchParams.get(SEARCH_PARAMS.PAGE)) || 1;

  useEffect(() => {
    updateCardList({ q, page });
  }, [updateCardList, q, page]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex flex-col fade-in">
        <h1 className="flex justify-center p-2 text-5xl light:text-black">
          Card List
        </h1>
        {cardList && (
          <>
            <CardPagination
              cardList={cardList}
              updateCardList={updateCardList}
            />
            <CardList cardList={cardList} />
          </>
        )}
      </div>
    </>
  );
}

export default SearchResults;
