import { useNavigate } from 'react-router';
import useStorage from '../../../hooks/useStorage';

function Page404(props: {
  isError: '404' | 'UnknownError' | false;
  updateResultList: (
    currentTerm: string,
    currentPage?: number
  ) => Promise<void>;
}) {
  const { setItem: setRecentSearch } = useStorage('RecentSearch');
  const navigate = useNavigate();

  function handleSearchAgain() {
    props.updateResultList('');
    navigate('/search');
    setRecentSearch('');
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="p-2 text-5xl">
        {props.isError === '404' && 'No Cards Found With That Name'}
        {props.isError === 'UnknownError' && 'Something Went Wrong'}
      </h1>
      <button
        className="p-3 text-xl bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-400"
        onClick={handleSearchAgain}
      >
        Search Again
      </button>
    </div>
  );
}

export default Page404;
