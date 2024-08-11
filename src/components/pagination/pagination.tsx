'use client';

import { useSetQuery } from '../../hooks/useSetQuery';
import React from 'react';

export default function Pagination({ isLast }: { isLast: boolean }) {
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
      <div className="pagination">
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
