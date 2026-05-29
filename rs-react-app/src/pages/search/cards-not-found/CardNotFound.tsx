import { useNavigate } from 'react-router';
import useStorage from '../../../hooks/useStorage';
import { type FetchSearchParams, type ErrorCode } from '@/types/types';
import { NAVIGATION, ERROR_CODES } from '@/constants/routes';

type CardNotFoundProps = {
  errorCode: ErrorCode;
  updateCardList: ({ q, page }: FetchSearchParams) => void;
};

function CardNotFound(props: CardNotFoundProps) {
  const { setItem: setRecentSearch } = useStorage('RecentSearch');
  const navigate = useNavigate();

  function handleSearchAgainClick() {
    props.updateCardList({ q: '', page: 1 });
    navigate(NAVIGATION.SEARCH.BASE);
    setRecentSearch('');
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="p-2 text-5xl">
        {props.errorCode === ERROR_CODES.NOT_FOUND &&
          'No Cards Found With That Name'}
        {props.errorCode === ERROR_CODES.UNKNOWN_ERROR &&
          'Something Went Wrong'}
      </h1>
      <button
        className="p-3 text-xl bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-400"
        onClick={handleSearchAgainClick}
      >
        Search Again
      </button>
    </div>
  );
}

export default CardNotFound;
