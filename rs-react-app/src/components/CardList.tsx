import { useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router';
import CardItem from './CardItem.tsx';
import CardMasterDetail from './CardMasterDetail.tsx';
import CardContainer from './CardContainer.tsx';
import { type SearchResponse } from '../services/fetchCardList.tsx';

function CardList(props: {
  isLoading: boolean;
  resultList: SearchResponse | null;
}) {
  const [activeCard, setActiveCard] = useState<string | undefined>(undefined);

  const cardItemList = (
    <div className={`flex-1 grid grid-cols-8 justify-items-center gap-4 p-2`}>
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
            setActiveCard={setActiveCard}
          />
        ))}
    </div>
  );

  const cardMasterDetail = (
    <>
      {activeCard && !props.isLoading && (
        <div className="w-2/5 flex justify-center">
          <CardMasterDetail
            setActiveCard={setActiveCard}
            activeCard={activeCard}
          />
        </div>
      )}
    </>
  );

  return (
    <div className="flex">
      {cardItemList}
      <Routes>
        <Route path="*" element={<CardContainer />}>
          <Route path="*" element={cardMasterDetail}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default CardList;
