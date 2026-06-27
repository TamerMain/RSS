import { defineRouting } from 'next-intl/routing';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/constants/routes';

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});
