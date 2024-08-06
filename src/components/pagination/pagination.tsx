import { useRouter } from 'next/router';
import { useSetQuery } from '../../hooks/useSetQuery';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import React from 'react';
import styles from './pagination.module.scss';

export default function Pagination() {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const isLast = useSelector((state: RootState) => state.isLast.isLast);
  const setQuery = useSetQuery();

  const increasePage = () => {
    const query = router.asPath.split('?')[1];
    const searchParams = new URLSearchParams(query);
    searchParams.set('page', `${page + 1}`);
    setQuery(searchParams);
  };

  const decreasePage = () => {
    const query = router.asPath.split('?')[1];
    const searchParams = new URLSearchParams(query);
    searchParams.set('page', `${page - 1}`);
    setQuery(searchParams);
  };

  return (
    <>
      <div className={styles.pagination}>
        <div
          className="prev-button"
          onClick={() => {
            if (page !== 1) decreasePage();
          }}
        >
          🠘
        </div>
        <div>{page}</div>
        <div
          className="next-button"
          onClick={() => {
            if (!isLast) increasePage();
          }}
        >
          🠚
        </div>
      </div>
    </>
  );
}
