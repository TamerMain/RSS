import { useEffect } from 'react';
import useFetchCard from '../../../hooks/useFetchCard';
import Loading from '../../../components/Loading';

function CardMasterDetail(props: {
  activeCard: string;
  setActiveCard: (cardName: string | undefined) => void;
}) {
  const { resultCard, updateResultCard, navigate, isLoading } = useFetchCard();

  useEffect(() => {
    updateResultCard(props.activeCard);
  }, [props.activeCard, updateResultCard]);

  function handleCloseMasterDetail() {
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete('details');
    navigate({ pathname: '/search', search: newParams.toString() });
    props.setActiveCard(undefined);
  }

  return (
    <>
      {isLoading && (
        <div className="fixed">
          <Loading />
        </div>
      )}
      {!isLoading && (
        <div className="fixed flex flex-col items-center w-1/4 p-2 bg-mist-800 text-center fade-in">
          <div className=" pr-2 ">{resultCard?.set_name} Set</div>
          <h2 className="text-2xl">{resultCard?.name}</h2>
          <img
            alt={`Full Art of ${resultCard?.name} Card`}
            className="w-full max-w-95 rounded-3xl"
            src={
              resultCard?.image_uris?.normal ||
              resultCard?.card_faces?.[0]?.image_uris?.normal
            }
            width="480"
            height="680"
          ></img>
          <div className="flex flex-row gap-10"></div>
          <button
            className="absolute  right-0 top-0 p-2 cursor-pointer"
            onClick={handleCloseMasterDetail}
          >
            X
          </button>
        </div>
      )}
    </>
  );
}

export default CardMasterDetail;
