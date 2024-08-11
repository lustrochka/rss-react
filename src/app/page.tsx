import ErrorBoundary from './error';
import React from 'react';
import { DetailedPage } from '../components/detailedPage/detailedPage';
import { Page } from '../components/page/page';
import { ISearchParams } from '../types';
import { getObjects, getDetails } from '../api/api';
import '../index.css';

export default async function App({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const res = await getObjects(searchParams);
  const details = searchParams.details;
  const detailsData = details ? await getDetails(details) : { data: {} };

  return (
    <ErrorBoundary>
      <div className="page">
        <Page data={res}></Page>
        {details && <DetailedPage data={detailsData} />}
      </div>
    </ErrorBoundary>
  );
}
