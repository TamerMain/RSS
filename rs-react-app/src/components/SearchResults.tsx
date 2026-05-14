import SearchStatusBar from './SearchStatusBar.tsx';
import CardItem from './CardItem.tsx';
import { type SearchResponse } from '../services/searchRequestApi.tsx';

function SearchResults(props: {
  isLoading: boolean;
  isError: '404' | 'UnknownError' | false;
  resultList: SearchResponse | null;
}) {
  return (
    <div className="flex flex-col gap-3  border-t-1 border-b-1 border-mist-800">
      <SearchStatusBar isLoading={props.isLoading} isError={props.isError} />
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
