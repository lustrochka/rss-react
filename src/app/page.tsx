'use client';

import ErrorBoundary from './error';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ThemeProvider from '../context/themeProvider';
import React from 'react';
import { DetailedPage } from '../components/detailedPage/detailedPage';
import { Page } from '../components/page/page';
import { useSearchParams } from 'next/navigation';
import '../index.css';

export default function App() {
  const searchParams = useSearchParams();

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <div className="page">
            <Page></Page>
            {searchParams.has('details') && (
              <DetailedPage id={searchParams.get('details') || ''} />
            )}
          </div>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
