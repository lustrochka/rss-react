import { useSetQuery } from '../../hooks/useSetQuery';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import React from 'react';
import styles from './pagination.module.scss';

export default function Pagination() {
  const isLast = useSelector((state: RootState) => state.isLast.isLast);
  const [query, setQuery] = useSetQuery();
  const page = Number(query.get('page')) || 1;

  const increasePage = () => {
    query.set('page', `${page + 1}`);
    setQuery(query);
  };

  const decreasePage = () => {
    query.set('page', `${page - 1}`);
    setQuery(query);
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
