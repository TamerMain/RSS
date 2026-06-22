import { NextIntlClientProvider } from 'next-intl';
import './globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="h-full bg-mist-950 light:bg-mist-100" lang="en">
      <body className="text-gray-50">
        <div id="root">
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
