import { useEffect } from 'react';
import { useLocation } from 'react-router';
import useFetchDetails from '@/hooks/useFetchDetails';
import Loader from '@/components/Loader';
import { createCardSearchParams } from '@/utils/getParams';
import { NAVIGATION, ERROR_CODES } from '@/constants/routes';

type CardMasterDetailProps = {
  activeCard: string;
  setActiveCard: (cardName: string | undefined) => void;
};

function CardMasterDetail(props: CardMasterDetailProps) {
  const { detailsCard, updateDetailsCard, navigate, isLoading, errorCode } =
    useFetchDetails();
  const location = useLocation();

  useEffect(() => {
    updateDetailsCard(props.activeCard);
  }, [props.activeCard, updateDetailsCard]);

  function handleCloseClick() {
    navigate({
      pathname: NAVIGATION.SEARCH.CARDS,
      search: createCardSearchParams({
        location: location.search,
        details: false,
      }),
    });
    props.setActiveCard(undefined);
  }

  if (isLoading)
    return (
      <div className="fixed">
        <Loader />
      </div>
    );

  if (errorCode) {
    return (
      <div className="fixed flex flex-col items-center w-1/4 p-2 bg-mist-800 text-center fade-in">
        <h2 className="text-2xl">Details not found for that card.</h2>
        <button
          className="absolute  right-0 top-0 p-2 cursor-pointer"
          onClick={handleCloseClick}
        >
          X
        </button>
      </div>
    );
  }

  return (
    <div className="fixed flex flex-col items-center w-1/4 p-2 bg-mist-800 text-center fade-in">
      <div className=" pr-2 ">
        {detailsCard?.set_name
          ? detailsCard?.set_name + 'Set'
          : 'Set Not Found'}
      </div>
      <h2 className="text-2xl">
        {detailsCard?.name ? detailsCard?.name : 'Name Not Found'}
      </h2>
      <img
        alt={`Full Art of ${detailsCard?.name} Card`}
        className="w-full max-w-95 rounded-3xl"
        src={
          detailsCard?.image_uris?.normal ||
          detailsCard?.card_faces?.[0]?.image_uris?.normal
        }
        width="480"
        height="680"
      ></img>
      <div className="flex flex-row gap-10"></div>
      <button
        className="absolute  right-0 top-0 p-2 cursor-pointer"
        onClick={handleCloseClick}
      >
        X
      </button>
    </div>
  );
}

export default CardMasterDetail;
