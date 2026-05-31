import { Routes, Route, Outlet } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import useFetchDetails from '@/hooks/useFetchDetails.tsx';
import useDetailsSearchParams from '@/hooks/useDetailsSearchParams.tsx';
import CardItem from './CardItem.tsx';
import CardMasterDetail from './CardMasterDetail.tsx';
import { toggleItem, type CardInfo } from '@/store/cartSlice.ts';
import { type RootState } from '@/store/store.ts';
import { type SearchResponse } from '@/types/types.ts';

type CardListProps = {
  cardList: SearchResponse;
};

function CardList(props: CardListProps) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { searchParams, setSearchParams } = useDetailsSearchParams();
  const detailsID = searchParams.id;
  const { detailsCard, isLoading, errorCode } = useFetchDetails(searchParams);

  function handleOpenDetailsClick(id: string) {
    setSearchParams({ id: id });
  }

  function handleCloseDetailsClick() {
    setSearchParams({ id: null });
  }

  function handleToCartClick(payload: CardInfo) {
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
              handleToCartClick({
                name: card.name,
                id: card.id,
                imageSrc:
                  card?.image_uris?.normal ||
                  card?.card_faces?.[0]?.image_uris?.normal,
                page: props.cardList.current_page,
                search: props.cardList.search_term,
              });
            }}
            onOpenDetailsClick={() => handleOpenDetailsClick(card.id)}
          />
        ))}
      </div>
      <Outlet />
    </>
  );

  const cardMasterDetail = (
    <>
      {detailsID && (
        <div className="w-2/5 flex justify-center">
          <CardMasterDetail
            detailsCard={detailsCard}
            isLoading={isLoading}
            errorCode={errorCode}
            onCloseDetailsClick={handleCloseDetailsClick}
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
