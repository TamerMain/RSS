function CardItem(props: {
  id: string;
  cardName: string | undefined;
  cardImageSrc: string | undefined;
  setActiveCard: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {

  return (
    <div
      onClick={() => {
        props.setActiveCard(props.id);
      }}
      className="flex flex-col items-center w-full text-gray-400 hover:text-gray-50"
    >
      {props.cardImageSrc && (
        <img
          alt={`Image of ${props.cardName} Card`}
          className="w-full hover:border-2 hover:border-mist-800"
          src={props.cardImageSrc}
          width="480"
          height="680"
          loading="lazy"
        ></img>
      )}
      {!props.cardImageSrc && (
        <div className="w-full h-full p-4 text-center">Image Not Found</div>
      )}
      <p>{props.cardName}</p>
    </div>
  );
}

export default CardItem;
