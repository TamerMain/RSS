import { useState, useEffect } from 'react';
import {
  detailsRequest,
  type DetailsResponse,
} from '../services/fetchCardDetails';

function CardMasterDetail(props: {
  activeCard: string;
  onClick: (cardName: string | undefined) => void;
}) {
  const [resultCard, setResultCard] = useState<DetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<'404' | 'UnknownError' | false>(false);

  useEffect(() => {
    updateResultList(props.activeCard);
  }, [props.activeCard]);

  async function updateResultList(id: string) {
    setIsError(false);
    setIsLoading(true);

    try {
      const cardList = await detailsRequest(id);
      window.setTimeout(() => {
        setResultCard(cardList);

        setIsLoading(false);
      }, 500);
    } catch (err) {
      setResultCard(null);
      if (err instanceof Error && err.message === '404') {
        setIsError('404');
      } else {
        setIsError('UnknownError');
      }

      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex justify-center w-2/5">
      <div className="fixed flex flex-col items-center h-150 w-110 p-2 bg-mist-800 text-center">
        <h2 className="text-lg">{resultCard?.name}</h2>
        <div>{resultCard?.set_name} Set</div>
        <img
          alt={`Full Art of ${resultCard?.name} Card`}
          className="w-full max-w-95"
          src={
            resultCard?.image_uris?.normal ||
            resultCard?.card_faces?.[0]?.image_uris?.normal
          }
          width="480"
          height="680"
          loading="lazy"
        ></img>
        <div className="flex flex-row gap-10">
        </div>
        <button
          className="absolute right-2 left p-3 cursor-pointer"
          onClick={() => {
            props.onClick(undefined);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default CardMasterDetail;
