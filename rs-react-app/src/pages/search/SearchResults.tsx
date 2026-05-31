import { ERROR_CODES } from '@/constants/routes.ts';
import useFetchCardList from '@/hooks/useFetchCardList.tsx';
import useCardListSearchParams from '@/hooks/useCardListSearchParams.tsx';
import CardPagination from './cards/CardPagination.tsx';
import CardList from './cards/CardList.tsx';
import CardNotFound from './cards/CardNotFound.tsx';
import Loader from '../../components/Loader.tsx';

function SearchResults() {
  const { searchParams, setSearchParams } = useCardListSearchParams();
  const { cardList, errorCode, isLoading } = useFetchCardList(searchParams);

  if (isLoading) return <Loader />;

  if (errorCode)
    return (
      <CardNotFound errorCode={errorCode} setSearchParams={setSearchParams} />
    );

  if (cardList) {
    return (
      <div className="flex flex-col fade-in">
        <h1 className="flex justify-center p-2 text-5xl light:text-black">
          Card List
        </h1>
        <CardPagination cardList={cardList} setSearchParams={setSearchParams} />
        <CardList cardList={cardList} />
      </div>
    );
  }

  return (
    <CardNotFound
      errorCode={ERROR_CODES.UNKNOWN_ERROR}
      setSearchParams={setSearchParams}
    />
  );
}

export default SearchResults;
