import { useNavigate } from 'react-router';
import useStorage from '@/hooks/useStorage';

function NotFound() {
  const { setItem: setRecentSearch } = useStorage('RecentSearch');
  const navigate = useNavigate();

  function handleSearchAgain() {
    navigate('/');
    setRecentSearch('');
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="p-2 text-5xl">Page Not Found</h1>
      <button
        className="p-3 text-xl bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-400"
        onClick={handleSearchAgain}
      >
        Home Page
      </button>
    </div>
  );
}

export default NotFound;
