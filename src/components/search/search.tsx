'use client';

import useSearchQuery from '../../hooks/useSearchQuery';
import { useSetQuery } from '../../hooks/useSetQuery';
import React from 'react';

export function Search() {
  const [searchString, setSearchString, saveSearchString] = useSearchQuery();
  const [query, setQuery] = useSetQuery();

  return (
    <div className="searchBlock">
      <div>Find astronomical object</div>
      <div className="search">
        <input
          type="search"
          value={searchString}
          className="searchInput"
          onChange={(event) => setSearchString(event.target.value.trim())}
        ></input>
        <div
          className="loupe"
          onClick={() => {
            saveSearchString();
            query.set('search', `${searchString}`);
            query.set('page', '1');
            setQuery(query);
          }}
        ></div>
      </div>
    </div>
  );
}
