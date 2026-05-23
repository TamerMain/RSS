function CardItem(props: {
  cardName: string | undefined;
  cardImageSrc: string | undefined;
  isInCart: boolean;
  handleToCart: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleActiveCard: () => void;
}) {
  return (
    <>
      {props.cardImageSrc && (
        <div
          onClick={() => {
            props.handleActiveCard();
          }}
          className="flex flex-col items-center w-full text-gray-400 hover:text-gray-50 hover:font-bold light:text-gray-800 light:hover:text-black  transition-colors transition-font-weight duration-400"
        >
          <div className="relative w-full rounded-[6%] border-2 border-transparent hover:border-mist-400 light:hover:border-mist-800 transition-colors duration-400">
            <img
              alt={`Image of ${props.cardName} Card`}
              className="rounded-[5%]"
              src={props.cardImageSrc}
              width="480"
              height="680"
              loading="lazy"
            ></img>
            <button
              onClick={props.handleToCart}
              className={`absolute left-[3%] bottom-[3%] w-5 h-5 rounded-full border-2 border-mist-400 light:border-mist-800 ${
                props.isInCart
                  ? 'bg-mist-400 light:bg-mist-800 shadow-[inset_0_0_0_2px] shadow-black light:shadow-mist-200'
                  : 'bg-black light:bg-mist-200'
              }`}
            ></button>
          </div>
          <p className="text-center">{props.cardName}</p>
        </div>
      )}
      {!props.cardImageSrc && (
        <div className="flex flex-col items-center w-full text-gray-400 hover:text-gray-50 transition-colors duration-400">
          <div className="relative w-full rounded-2xl border-2 border-transparent hover:border-mist-400 transition-colors duration-400">
            <div className="w-full h-full p-4 text-center">Image Not Found</div>
            <button
              onClick={props.handleToCart}
              className={`absolute left-[3%] bottom-[3%] w-5 h-5 rounded-full border-2 border-mist-400 ${
                props.isInCart
                  ? 'bg-mist-400 shadow-[inset_0_0_0_2px] shadow-black'
                  : 'bg-black'
              }`}
            ></button>
          </div>
          <p className="text-center">{props.cardName}</p>
        </div>
      )}
    </>
  );
}

export default CardItem;
