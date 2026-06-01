import { useNavigate } from 'react-router';
import useStorage from '../../../hooks/useStorage';
import { NAVIGATION, ERROR_CODES } from '@/constants/routes';
import { type FetchSearchParams, type ErrorCode } from '@/types/types';

type CardNotFoundProps = {
  setSearchParams: (newParams: FetchSearchParams) => void;
  errorCode: ErrorCode;
};

function CardNotFound(props: CardNotFoundProps) {
  const { setItem: setRecentSearch } = useStorage('RecentSearch');
  const navigate = useNavigate();

  function handleSearchAgainClick() {
    navigate(NAVIGATION.HOME);
    props.setSearchParams({ q: '', page: 1 });
    setRecentSearch('');
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="p-2 text-5xl">
        {props.errorCode === ERROR_CODES.NOT_NUMBER && 'Page Must Be A Number'}
        {props.errorCode === ERROR_CODES.NOT_FOUND &&
          'No Cards Found With That Name'}
        {props.errorCode === ERROR_CODES.UNKNOWN_ERROR &&
          'Something Went Wrong'}
        {props.errorCode === ERROR_CODES.UNPROCESSABLE_CONTENT &&
          'No Cards Found On That Page'}
        {props.errorCode === ERROR_CODES.NOT_ZERO && 'Page Cant Be Zero'}
        {props.errorCode === ERROR_CODES.NOT_NATURAL &&
          'Page Can Only Positive Whole Number'}
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
