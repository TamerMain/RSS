import { useTranslations } from 'next-intl';
import { CACHE_TAG } from '@/constants/routes';
// import { useDispatch } from 'react-redux';

type RefreshCacheButtonProps = {
  tag: (typeof CACHE_TAG)[keyof typeof CACHE_TAG];
};

function RefreshCacheButton(props: RefreshCacheButtonProps) {
    const t = useTranslations('Navigation');
  // const dispatch = useDispatch();

  // function handleRefreshCache() {
  //   dispatch(fetchAPI.util.invalidateTags([props.tag]));
  // }

  return (
    <button
      className="p-2 bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer transition-colors duration-400"
      // onClick={handleRefreshCache}
    >
      {t(props.tag)}
    </button>
  );
}

export default RefreshCacheButton;
