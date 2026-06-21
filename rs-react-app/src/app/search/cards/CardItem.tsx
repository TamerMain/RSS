type CardItemProps = {
  cardName: string | undefined;
  cardImageSrc: string | undefined;
};

function CardItem(props: CardItemProps) {
  if (!props.cardImageSrc) {
    return (
      <>
        <div className="w-full rounded-2xl border-2 border-transparent hover:border-mist-400 transition-colors duration-400">
          <div className="w-full h-full min-h-[240px] p-4 text-center rounded-2xl bg-gray-900 light:bg-gray-300">
            Image Not Found
          </div>
        </div>
        <p className="text-center">{props.cardName}</p>
      </>
    );
  }

  if (props.cardImageSrc) {
    return (
      <>
        <div className="w-full rounded-[6%] border-2 border-transparent hover:border-mist-400 light:hover:border-mist-800 transition-colors duration-400">
          <img
            alt={`Image of ${props.cardName} Card`}
            className="rounded-[5%] text-center"
            src={props.cardImageSrc}
            width="480"
            height="680"
            loading="lazy"
            decoding="async"
          />
        </div>
        <p className="text-center">{props.cardName}</p>
      </>
    );
  }
}

export default CardItem;
