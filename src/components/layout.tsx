import { Outlet } from 'react-router-dom';
import { Page } from './page/page';
import { useSearchParams } from 'react-router-dom';
import { ErrorBoundary } from './errorBoundary';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ThemeProvider from '../context/themeProvider';

export function Layout() {
  const [searchParams] = useSearchParams();
  return (
    <ErrorBoundary>
      <div className="page">
        <Provider store={store}>
          <ThemeProvider>
            <Page></Page>
            {searchParams.has('details') && (
              <Outlet context={[searchParams.get('details')]} />
            )}
          </ThemeProvider>
        </Provider>
      </div>
    </ErrorBoundary>
  );
}
