import CardMasterDetailsCloseButton from '@/app/search/cards/CardMasterDetailsCloseButton';
import fetchDetails from '@/services/fetchDetails';
import { type SearchParams } from '@/types/types';
import { SEARCH_PARAMS } from '@/constants/routes.ts';

type CardMasterDetailProps = { searchParams: SearchParams };

async function CardMasterDetail(props: CardMasterDetailProps) {
  const validDetailsParams = {
    [SEARCH_PARAMS.DETAILS]: props.searchParams[SEARCH_PARAMS.DETAILS] || null,
  };
  const { detailsCard, errorCode } = await fetchDetails(validDetailsParams);

  if (!props.searchParams[SEARCH_PARAMS.DETAILS]) {
    return null;
  }

  if (errorCode || !detailsCard) {
    return (
      <div className="w-2/5 flex justify-center">
        <div className="fixed flex flex-col items-center w-1/4 p-2 bg-mist-800 text-center fade-in">
          <h2 className="text-2xl">Details not found for that card.</h2>
          <CardMasterDetailsCloseButton />
        </div>
      </div>
    );
  }

  return (
    <div className="w-2/5 flex justify-center">
      <div className="fixed flex flex-col items-center w-1/4 max-w-[440px] p-2 bg-mist-800 text-center fade-in">
        <div className=" pr-2 ">
          {detailsCard.set_name
            ? detailsCard.set_name + ' Set'
            : 'Set Not Found'}
        </div>
        <h2 className="text-2xl">
          {detailsCard.name ? detailsCard?.name : 'Name Not Found'}
        </h2>
        <img
          alt={`Full Art of ${detailsCard?.name} Card`}
          className="w-full max-w-95 rounded-3xl"
          src={
            detailsCard.image_uris?.normal ||
            detailsCard.card_faces?.[0]?.image_uris?.normal
          }
          width="480"
          height="680"
        ></img>
        <div className="flex flex-row gap-10"></div>
        <CardMasterDetailsCloseButton />
      </div>
    </div>
  );
}

export default CardMasterDetail;
