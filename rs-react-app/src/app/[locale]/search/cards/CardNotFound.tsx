'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useStorage from '../../../../hooks/useStorage';
import useClientSearchParams from '@/hooks/useClientSearchParams';
import { NAVIGATION, ERROR_CODES, SEARCH_PARAMS } from '@/constants/routes';
import { type ErrorCode } from '@/types/types';

type CardNotFoundProps = {
  errorCode: ErrorCode;
};

function CardNotFound(props: CardNotFoundProps) {
  const t = useTranslations('CardNotFound');
  const { setSearchParams } = useClientSearchParams();
  const { setItem: setRecentSearch } = useStorage('RecentSearch');
  const router = useRouter();

  function handleSearchAgainClick() {
    router.push(NAVIGATION.HOME);
    setSearchParams({
      [SEARCH_PARAMS.QUERY]: '',
      [SEARCH_PARAMS.PAGE]: 1,
    });
    setRecentSearch('');
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="p-2 text-5xl">
        {props.errorCode === ERROR_CODES.NOT_NUMBER && t('notNumber')}
        {props.errorCode === ERROR_CODES.NOT_FOUND && t('notFound')}
        {props.errorCode === ERROR_CODES.UNKNOWN_ERROR && t('unknown')}
        {props.errorCode === ERROR_CODES.UNPROCESSABLE_CONTENT &&
          t('unprocessableContent')}
        {props.errorCode === ERROR_CODES.NOT_ZERO && t('notZero')}
        {props.errorCode === ERROR_CODES.NOT_NATURAL && t('notNatural')}
      </h1>
      <button
        className="p-3 text-xl bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 transition-colors duration-400"
        onClick={handleSearchAgainClick}
      >
        {t('homeButton')}
      </button>
    </div>
  );
}

export default CardNotFound;
