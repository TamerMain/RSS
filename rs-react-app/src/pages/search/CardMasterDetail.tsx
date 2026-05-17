import { useEffect } from 'react';
import useFetchCard from '../../hooks/useFetchCard';

function CardMasterDetail(props: {
  activeCard: string;
  setActiveCard: (cardName: string | undefined) => void;
}) {
  const { resultCard, updateResultCard, setSearchParams } = useFetchCard();

  useEffect(() => {
    updateResultCard(props.activeCard);
  }, [props.activeCard]);

  function handleCloseMasterDetail() {
    setSearchParams((prev) => {
      prev.delete('details');
      return prev;
    });
    props.setActiveCard(undefined);
  }

  return (
    <div className="fixed flex flex-col items-center w-1/4 p-2bg-mist-800 text-center">
      <div className=" pr-2 ">{resultCard?.set_name} Set</div>
      <h2 className="text-lg">{resultCard?.name}</h2>
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
      <div className="flex flex-row gap-10"></div>
      <button
        className="absolute  right-0 top-0 p-2 cursor-pointer"
        onClick={handleCloseMasterDetail}
      >
        X
      </button>
    </div>
  );
}

export default CardMasterDetail;
