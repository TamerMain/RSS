import CardItem from './CardItem.tsx';
import CardItemContainer from '@/app/[locale]/search/cards/CardItemContainer.tsx';
import { type SearchResponse } from '@/types/types.ts';

type CardListProps = {
  cardList: SearchResponse;
};

function CardList(props: CardListProps) {
  return (
    <>
      {props.cardList.data?.map((card) => (
        <CardItemContainer
          key={card.id}
          id={card.id}
          card={{
            name: card.name,
            id: card.id,
            imageSrc:
              card?.image_uris?.normal ||
              card?.card_faces?.[0]?.image_uris?.normal,
            page: props.cardList.current_page,
            search: props.cardList.search_term,
          }}
        >
          <CardItem
            cardImageSrc={
              card?.image_uris?.normal ||
              card?.card_faces?.[0]?.image_uris?.normal
            }
            cardName={card.name}
          />
        </CardItemContainer>
      ))}
    </>
  );
}

export default CardList;
