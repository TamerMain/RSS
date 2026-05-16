import { useState } from 'react';
import CardItem from './CardItem.tsx';
import CardMasterDetail from './CardMasterDetail.tsx';
import { type SearchResponse } from '../services/fetchCardList.tsx';

function CardList(props: {
  isLoading: boolean;
  resultList: SearchResponse | null;
}) {
  const [activeCard, setActiveCard] = useState<string | undefined>(undefined);

  function showMasterDetail(id: string | undefined) {
    setActiveCard(id);
  }

  return (
    <div className={`${activeCard ? 'flex' : ''}`}>
      <div
        className={`grid ${activeCard ? 'grid-cols-6' + ' ' + 'w-3/5' : 'grid-cols-8'} justify-items-center gap-4 p-2`}
      >
        {props.resultList &&
          !props.isLoading &&
          props.resultList.data?.map((card) => (
            <CardItem
              key={card.id}
              id={card.id}
              cardImageSrc={
                card?.image_uris?.normal ||
                card?.card_faces?.[0]?.image_uris?.normal
              }
              cardName={card.name}
              onClick={showMasterDetail}
            />
          ))}
      </div>
      {activeCard && !props.isLoading && (
        <CardMasterDetail onClick={showMasterDetail} activeCard={activeCard} />
      )}
    </div>
  );
}

export default CardList;
