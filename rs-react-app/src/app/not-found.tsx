'use client';

import { useRouter } from 'next/navigation';
import useStorage from '@/hooks/useStorage';
import { NAVIGATION } from '@/constants/routes';

export default function NotFound() {
  const { setItem: setRecentSearch } = useStorage('RecentSearch');
  const router = useRouter();

  function handleHomePageClick() {
    router.push(NAVIGATION.HOME);
    setRecentSearch('');
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="p-2 text-5xl light:text-black">Page Not Found</h1>
      <button
        className="p-3 text-xl bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-400"
        onClick={handleHomePageClick}
      >
        Home Page
      </button>
    </div>
  );
}
