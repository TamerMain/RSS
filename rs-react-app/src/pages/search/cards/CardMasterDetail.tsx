import Loader from '@/components/Loader';
import { type DetailsResponse, type ErrorCode } from '@/types/types';

type CardMasterDetailProps = {
  detailsCard: DetailsResponse | null | undefined;
  isLoading: boolean;
  errorCode: ErrorCode;
  onCloseDetailsClick: () => void;
};

function CardMasterDetail(props: CardMasterDetailProps) {
  if (props.isLoading)
    return (
      <div className="fixed">
        <Loader />
      </div>
    );

  if (props.errorCode || !props.detailsCard) {
    return (
      <div className="fixed flex flex-col items-center w-1/4 p-2 bg-mist-800 text-center fade-in">
        <h2 className="text-2xl">Details not found for that card.</h2>
        <button
          className="absolute  right-0 top-0 p-2 cursor-pointer"
          onClick={() => {
            props.onCloseDetailsClick();
          }}
        >
          X
        </button>
      </div>
    );
  }

  return (
    <div className="fixed flex flex-col items-center w-1/4 max-w-[440px] p-2 bg-mist-800 text-center fade-in">
      <div className=" pr-2 ">
        {props.detailsCard.set_name
          ? props.detailsCard.set_name + ' Set'
          : 'Set Not Found'}
      </div>
      <h2 className="text-2xl">
        {props.detailsCard.name ? props.detailsCard?.name : 'Name Not Found'}
      </h2>
      <img
        alt={`Full Art of ${props.detailsCard?.name} Card`}
        className="w-full max-w-95 rounded-3xl"
        src={
          props.detailsCard.image_uris?.normal ||
          props.detailsCard.card_faces?.[0]?.image_uris?.normal
        }
        width="480"
        height="680"
      ></img>
      <div className="flex flex-row gap-10"></div>
      <button
        className="absolute  right-0 top-0 p-2 cursor-pointer"
        onClick={() => {
          props.onCloseDetailsClick();
        }}
      >
        X
      </button>
    </div>
  );
}

export default CardMasterDetail;
