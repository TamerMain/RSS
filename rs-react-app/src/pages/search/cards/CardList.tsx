import { useState, useEffect } from 'react';
import { Routes, Route, Outlet, useSearchParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import CardItem from './CardItem.tsx';
import CardMasterDetail from './CardMasterDetail.tsx';
import { toggleItem, type CardInfo } from '@/store/cartSlice.ts';
import { type RootState } from '@/store/store.ts';
import { type SearchResponse } from '@/types/types.ts';
import useLazyFetchDetails from '@/hooks/useLazyFetchDetails';
import { SEARCH_PARAMS } from '@/constants/routes.ts';

type CardListProps = {
  cardList: SearchResponse;
};

function CardList(props: CardListProps) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const { detailsCard, updateDetails, isLoading, errorCode } =
    useLazyFetchDetails();

  const [searchParams] = useSearchParams();
  const id = searchParams.get(SEARCH_PARAMS.DETAILS);

  useEffect(() => {
    if (id) {
      updateDetails(id);
    }
  }, [id, updateDetails]);

  function handleActiveCardClick(id: string) {
    updateDetails(id);
    setShowDetails(true);
  }

  function handleCloseClick() {
    updateDetails(null);
    setShowDetails(false);
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
      {showDetails && detailsCard && (
        <div className="w-2/5 flex justify-center">
          <CardMasterDetail
            detailsCard={detailsCard}
            isLoading={isLoading}
            errorCode={errorCode}
            onCloseClick={handleCloseClick}
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
