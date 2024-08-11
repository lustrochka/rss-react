'use client';

import React from 'react';
import { useSetQuery } from '../../hooks/useSetQuery';

export default function CloseButton() {
  const [query, setQuery] = useSetQuery();

  const changeUrl = () => {
    query.delete('details');
    setQuery(query);
  };

  return (
    <div className="closeButton" onClick={changeUrl}>
      ✖
    </div>
  );
}
