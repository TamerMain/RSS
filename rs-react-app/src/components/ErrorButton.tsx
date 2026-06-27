import { useState } from 'react';
import { useTranslations } from 'next-intl';

function ErrorButton() {
  const [isUnexpectedError, setIsUnexpectedError] = useState<boolean>(false);
  const t = useTranslations('Navigation');

  if (isUnexpectedError) {
    throw new Error('Unexpected Error');
  }

  return (
    <button
      className="p-2 bg-mist-800 text-gray-400 hover:text-gray-50 cursor-pointer transition-colors duration-400"
      onClick={() => setIsUnexpectedError(true)}
    >
      {t('emulateError')}
    </button>
  );
}

export default ErrorButton;
