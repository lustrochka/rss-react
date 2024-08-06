import { useRouter } from 'next/router';
import { Page } from '../components/page/page';
import { DetailedPage } from '../components/detailedPage/detailedPage';
import React from 'react';

export default function Home() {
  const router = useRouter();
  const details =
    typeof router.query.details === 'string' ? router.query.details : '';
  return (
    <div className="page">
      <Page></Page>
      {details && <DetailedPage id={details} />}
    </div>
  );
}
