import StatusBar from './StatusBar.tsx';
import CardNavigation from './CardNavigation.tsx';
import CardList from './CardList.tsx';
import { type SearchResponse } from '../services/fetchCardList.tsx';

function SearchResults(props: {
  isLoading: boolean;
  isError: '404' | 'UnknownError' | false;
  resultList: SearchResponse | null;
  updateResultList: (currentInput: string, currentPage: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3  border-t-1 border-mist-800">
      <StatusBar isLoading={props.isLoading} isError={props.isError} />
      {props.resultList && (
        <CardNavigation
          isLoading={props.isLoading}
          resultList={props.resultList}
          updateResultList={props.updateResultList}
        />
      )}
      <CardList isLoading={props.isLoading} resultList={props.resultList} />
    </div>
  );
}

export default SearchResults;
