/* eslint-disable react-refresh/only-export-components */
import About from './About';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

export default function AboutPage() {
  return <About />;
}
