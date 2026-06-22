'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const searchParams = useSearchParams();

  const switchLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');

    let newPath = `/${newLocale}${pathWithoutLocale}`;

    const queryString = searchParams.toString();
    if (queryString) {
      newPath += `?${queryString}`;
    }

    router.push(newPath);
    router.refresh();
  };

  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => switchLanguage('en')}
        disabled={currentLocale === 'en'}
        className="px-3 py-1 text-gray-400 hover:text-gray-50 bg-mist-800 cursor-pointer disabled:text-gray-50"
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('ru')}
        disabled={currentLocale === 'ru'}
        className="px-3 py-1 text-gray-400 hover:text-gray-50 bg-mist-800 cursor-pointer disabled:text-gray-50"
      >
        RU
      </button>
    </div>
  );
}
