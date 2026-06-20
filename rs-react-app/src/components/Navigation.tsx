import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ErrorButton from '../components/ErrorButton.tsx';
import ThemeButton from './ThemeButton.tsx';
import RefreshCacheButton from './RefreshCacheButton.tsx';
import { CACHE_TAG } from '@/constants/routes.ts';
import Cart from './Cart.tsx';
import { NAVIGATION } from '@/constants/routes.ts';

export default function Navigation() {
  const pathname = usePathname();

  function isActive(path: string): boolean {
    return pathname === path;
  }

  return (
    <nav className="fixed h-[98vh] flex flex-col justify-between gap-1 max-w-30 py-[2vh] text-center fade-in">
      <div className="flex flex-col gap-1 fade-in">
        <ThemeButton />
        <Link
          href={NAVIGATION.SEARCH.BASE}
          className={`p-2 bg-mist-800 ${
            isActive(NAVIGATION.SEARCH.BASE)
              ? 'text-gray-50 pointer-events-none'
              : 'text-gray-400 hover:text-gray-50'
          } cursor-pointer max-w-30 transition-colors duration-400`}
        >
          Search
        </Link>
        <Link
          href={NAVIGATION.ABOUT}
          className={`p-2 bg-mist-800 ${
            isActive(NAVIGATION.ABOUT)
              ? 'text-gray-50 pointer-events-none'
              : 'text-gray-400 hover:text-gray-50'
          } cursor-pointer max-w-30 transition-colors duration-400`}
        >
          About
        </Link>
        <ErrorButton />
        <RefreshCacheButton tag={CACHE_TAG.CARD_LIST} />
        <RefreshCacheButton tag={CACHE_TAG.DETAILS} />
      </div>
      <Cart />
    </nav>
  );
}
