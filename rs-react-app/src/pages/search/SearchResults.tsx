import CardNavigation from './CardNavigation.tsx';
import CardList from './CardList.tsx';
import { type SearchResponse } from '../../services/fetchCardList.tsx';

function SearchResults(props: {
  isLoading: boolean;
  resultList: SearchResponse | null;
  updateResultList: (currentInput: string, currentPage: number) => void;
}) {
  return (
    <>
      {!props.isLoading && (
        <div className="flex flex-col">
          <h1 className="flex justify-center p-2 text-xl">Card List</h1>
          {props.resultList && (
            <>
              <CardNavigation
                resultList={props.resultList}
                updateResultList={props.updateResultList}
              />
            </>
          )}
          <CardList resultList={props.resultList} />
        </div>
      )}
    </>
  );
}

export default SearchResults;
