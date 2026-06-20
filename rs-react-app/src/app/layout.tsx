import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Magic: The Gathering',
  description: 'RSS School Task 8',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full bg-mist-950 light:bg-mist-100" lang="en">
      <body className="text-gray-50">
        <div id="root">
          <ClientLayout>{children}</ClientLayout>
        </div>
      </body>
    </html>
  );
}
