import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import CardItem from './CardItem.tsx';
import CardMasterDetail from './CardMasterDetail.tsx';
import { type SearchResponse } from '../../../services/fetchCardList.tsx';
import { toggleItem, type RootState, type CardInfo } from '@/store/store.ts';

function CardList(props: { resultList: SearchResponse }) {
  const [activeCard, setActiveCard] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  function handleActiveCard(id: string) {
    setActiveCard(id);
  }

  function handleToCart(payload: CardInfo) {
    dispatch(toggleItem(payload));
  }

  const cardItemList = (
    <>
      <div className={`flex-1 grid grid-cols-6 justify-items-center gap-4 p-2`}>
        {props.resultList.data?.map((card) => (
          <CardItem
            key={card.id}
            cardImageSrc={
              card?.image_uris?.normal ||
              card?.card_faces?.[0]?.image_uris?.normal
            }
            cardName={card.name}
            isInCart={cart.some((cartItem) => cartItem.name === card.name)}
            handleToCart={(e) => {
              e.stopPropagation();
              handleToCart({
                name: card.name,
                id: card.id,
                imageSrc:
                  card?.image_uris?.normal ||
                  card?.card_faces?.[0]?.image_uris?.normal,
                page: props.resultList.current_page,
                search: props.resultList.search_term
              });
            }}
            handleActiveCard={() => handleActiveCard(card.id)}
          />
        ))}
      </div>
      <Outlet />
    </>
  );

  const cardMasterDetail = (
    <>
      {activeCard && (
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
      <Routes>
        <Route path="/*" element={cardItemList}>
          <Route path="*" element={cardMasterDetail}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default CardList;
