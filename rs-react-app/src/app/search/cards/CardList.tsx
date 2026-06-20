import { useSelector, useDispatch } from 'react-redux';
import useFetchDetails from '@/hooks/useFetchDetails.tsx';
import useDetailsSearchParams from '@/hooks/useDetailsSearchParams.tsx';
import CardItem from './CardItem.tsx';
import CardMasterDetail from './CardMasterDetail.tsx';
import { toggleItem, type CardInfo } from '@/store/cartSlice.ts';
import { type RootState } from '@/store/store.ts';
import { type SearchResponse } from '@/types/types.ts';
import { SEARCH_PARAMS } from '@/constants/routes.ts';

type CardListProps = {
  cardList: SearchResponse;
};

function CardList(props: CardListProps) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { searchParams, setSearchParams } = useDetailsSearchParams();
  const detailsID = searchParams[SEARCH_PARAMS.DETAILS];
  const { detailsCard, isLoading, errorCode } = useFetchDetails(searchParams);

  function handleOpenDetailsClick(id: string) {
    setSearchParams({ [SEARCH_PARAMS.DETAILS]: id });
  }

  function handleCloseDetailsClick() {
    setSearchParams({ [SEARCH_PARAMS.DETAILS]: null });
  }

  function handleToCartClick(payload: CardInfo) {
    dispatch(toggleItem(payload));
  }

  return (
    <div className="flex">
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
    </div>
  );
}

export default CardList;
