import { Outlet } from 'react-router-dom';
import { Page } from './page';
import { useSearchParams } from 'react-router-dom';
import { ErrorBoundary } from './errorBoundary';

export function Layout() {
  const [searchParams] = useSearchParams();
  return (
    <ErrorBoundary>
      <div className="page">
        <Page></Page>
        {searchParams.has('details') && (
          <Outlet context={[searchParams.get('details')]} />
        )}
      </div>
    </ErrorBoundary>
  );
}
