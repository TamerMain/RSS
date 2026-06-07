import CardPagination from './cards/CardPagination.tsx';
import CardList from './cards/CardList.tsx';
import Loader from '../../components/Loader.tsx';
import { type SearchResponse } from '../../services/fetchCardList.tsx';
import { type SearchQuery } from '@/hooks/useFetchCardList.tsx';

type SearchResultsProps = {
  isLoading: boolean;
  cardList: SearchResponse | null;
  updateCardList: ({ q, page }: SearchQuery) => void;
};

function SearchResults(props: SearchResultsProps) {
  if (props.isLoading) return <Loader />;
  return (
    <>
      <div className="flex flex-col fade-in">
        <h1 className="flex justify-center p-2 text-5xl light:text-black">
          Card List
        </h1>
        {props.cardList && (
          <>
            <CardPagination
              cardList={props.cardList}
              updateCardList={props.updateCardList}
            />
            <CardList cardList={props.cardList} />
          </>
        )}
      </div>
    </>
  );
}

export default SearchResults;
