import CardNavigation from './+params/CardNavigation.tsx';
import CardList from './+params/CardList.tsx';
import Loading from '../../components/Loading.tsx';
import { type SearchResponse } from '../../services/fetchCardList.tsx';

function SearchResults(props: {
  isLoading: boolean;
  resultList: SearchResponse | null;
  updateResultList: (currentInput: string, currentPage: number) => void;
}) {
  return (
    <>
      {props.isLoading && <Loading />}
      {!props.isLoading && (
        <div className="flex flex-col fade-in">
          <h1 className="flex justify-center p-2 text-5xl light:text-black">Card List</h1>
          {props.resultList && (
            <>
              <CardNavigation
                resultList={props.resultList}
                updateResultList={props.updateResultList}
              />
              <CardList resultList={props.resultList} />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default SearchResults;
