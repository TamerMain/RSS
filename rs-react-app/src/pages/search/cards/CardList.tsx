import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import CardItem from './CardItem.tsx';
import CardMasterDetail from './CardMasterDetail.tsx';
import { type SearchResponse } from '@/types/types.ts';
import { toggleItem, type RootState, type CardInfo } from '@/store/store.ts';

type CardListProps = { cardList: SearchResponse };

function CardList(props: CardListProps) {
  const [activeCard, setActiveCard] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  function handleActiveCardClick(id: string) {
    setActiveCard(id);
  }

  function handleToCart(payload: CardInfo) {
    dispatch(toggleItem(payload));
  }

  const cardItemList = (
    <>
      <div className={`flex-1 grid grid-cols-6 justify-items-center gap-4 p-2`}>
        {props.cardList.data?.map((card) => (
          <CardItem
            key={card.id}
            cardImageSrc={
              card?.image_uris?.normal ||
              card?.card_faces?.[0]?.image_uris?.normal
            }
            cardName={card.name}
            isInCart={cart.some((cartItem) => cartItem.name === card.name)}
            onToCartClick={(e) => {
              e.stopPropagation();
              handleToCart({
                name: card.name,
                id: card.id,
                imageSrc:
                  card?.image_uris?.normal ||
                  card?.card_faces?.[0]?.image_uris?.normal,
                page: props.cardList.current_page,
                search: props.cardList.search_term,
              });
            }}
            onActiveCardClick={() => handleActiveCardClick(card.id)}
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
