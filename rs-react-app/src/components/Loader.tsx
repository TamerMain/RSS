import { useTranslations } from 'next-intl';

export default function Loader() {
  const t = useTranslations('Loader');
  return (
    <h1
      data-testid="loader"
      className="flex justify-center p-2 text-xl light:text-black light:font-bold fade-in"
    >
      <span className="animate-spin w-6 h-6 text-center">⟡ </span>
      {t('loader')}
      <span className="animate-spin w-6 h-6 text-center"> ⟡</span>
    </h1>
  );
}
