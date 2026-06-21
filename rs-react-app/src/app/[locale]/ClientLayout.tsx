'use client';

import Navigation from '@/components/Navigation';
import ErrorBoundary from '@/components/ErrorBoundary.tsx';
import { ThemeProvider } from '@/contexts/ThemeProvider.tsx';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <div className="h-full min-h-[100vh] light:bg-mist-100">
            <Navigation />
            <div className="relative flex flex-col justify-center gap-3 w-3/4 mx-auto p-[2vh] light:bg-mist-200 transition-height">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
