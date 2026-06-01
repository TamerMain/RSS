type CardItemProps = {
  cardName: string | undefined;
  cardImageSrc: string | undefined;
  onActiveCardClick: () => void;
};

function CardItem(props: CardItemProps) {
  return (
    <div
      onClick={() => {
        props.onActiveCardClick();
      }}
      className="flex flex-col items-center w-full text-gray-400 hover:text-gray-50 transition-colors duration-400"
    >
      {props.cardImageSrc && (
        <img
          alt={`Image of ${props.cardName} Card`}
          className="w-full rounded-2xl border-2 border-transparent hover:border-mist-800 transition-colors duration-400"
          src={props.cardImageSrc}
          width="480"
          height="680"
          loading="lazy"
        ></img>
      )}
      {!props.cardImageSrc && (
        <div className="w-full h-full p-4 text-center">Image Not Found</div>
      )}
      <p className="text-center">{props.cardName}</p>
    </div>
  );
}

export default CardItem;
