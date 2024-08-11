import { ErrorBoundary } from '../components/error/errorBoundary';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ThemeProvider from '../context/themeProvider';
import React from 'react';
import { AppProps } from 'next/app';
import '../index.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
