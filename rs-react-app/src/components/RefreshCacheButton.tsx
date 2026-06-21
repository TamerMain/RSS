import { CACHE_TAG } from '@/constants/routes';
// import { useDispatch } from 'react-redux';

type RefreshCacheButtonProps = {
  tag: (typeof CACHE_TAG)[keyof typeof CACHE_TAG];
};

function RefreshCacheButton(props: RefreshCacheButtonProps) {
  // const dispatch = useDispatch();

  // function handleRefreshCache() {
  //   dispatch(fetchAPI.util.invalidateTags([props.tag]));
  // }

  return (
    <button
      className="p-2 bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer transition-colors duration-400"
      // onClick={handleRefreshCache}
    >
      Clear {props.tag} Cache
    </button>
  );
}

export default RefreshCacheButton;
