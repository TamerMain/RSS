import { useSelector, useDispatch } from 'react-redux';
import CardItem from './CardItem.tsx';
import CardItemContainer from '@/app/search/cards/CardItemContainer';
import { toggleItem, type CardInfo } from '@/store/cartSlice.ts';
import { type RootState } from '@/store/store.ts';
import { type SearchResponse } from '@/types/types.ts';

type CardListProps = {
  cardList: SearchResponse;
};

function CardList(props: CardListProps) {
  // const dispatch = useDispatch();
  // const cart = useSelector((state: RootState) => state.cart);

  // function handleToCartClick(payload: CardInfo) {
  //   dispatch(toggleItem(payload));
  // }

  return (
    <>
      {props.cardList.data?.map((card) => (
        <CardItemContainer key={card.id} id={card.id}>
          <CardItem
            cardImageSrc={
              card?.image_uris?.normal ||
              card?.card_faces?.[0]?.image_uris?.normal
            }
            cardName={card.name}
            // isInCart={cart.some((cartItem) => cartItem.name === card.name)}
            // onToCartClick={(e) => {
            //   e.stopPropagation();
            //   handleToCartClick({
            //     name: card.name,
            //     id: card.id,
            //     imageSrc:
            //       card?.image_uris?.normal ||
            //       card?.card_faces?.[0]?.image_uris?.normal,
            //     page: props.cardList.current_page,
            //     search: props.cardList.search_term,
            //   });
            // }}
          />
        </CardItemContainer>
      ))}
    </>
  );
}

export default CardList;
