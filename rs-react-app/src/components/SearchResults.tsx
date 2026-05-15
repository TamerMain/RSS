import StatusBar from './StatusBar.tsx';
import CardItem from './CardItem.tsx';
import CardNavigation from './CardNavigation.tsx';
import { type SearchResponse } from '../services/searchRequestApi.tsx';

function SearchResults(props: {
  isLoading: boolean;
  isError: '404' | 'UnknownError' | false;
  resultList: SearchResponse | null;
  updateResultList: (currentInput: string, currentPage: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3  border-t-1 border-b-1 border-mist-800">
      <StatusBar isLoading={props.isLoading} isError={props.isError} />
      {props.resultList && (
        <CardNavigation
          updateResultList={props.updateResultList}
          resultList={props.resultList}
          isLoading={props.isLoading}
        />
      )}
      <div className="grid grid-cols-5 justify-items-center gap-4 p-2">
        {props.resultList &&
          props.resultList.data?.map((card) => (
            <CardItem
              key={card.id}
              cardImageSrc={
                card?.image_uris?.normal ||
                card?.card_faces?.[0]?.image_uris?.normal
              }
              cardName={card.name}
            />
          ))}
      </div>
    </div>
  );
}

export default SearchResults;
