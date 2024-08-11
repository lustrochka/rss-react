'use client';

import { IAstronomicalObject } from '../../types';
import { useSetQuery } from '../../hooks/useSetQuery';
import React from 'react';

interface IMyProps {
  data: IAstronomicalObject;
}

export default function Card(props: IMyProps) {
  const [query, setQuery] = useSetQuery();

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target instanceof HTMLElement) {
      if (!e.target.classList.contains('cardCheckbox'))
        goToItem(props.data.uid);
    }
  };

  const goToItem = (id: number) => {
    query.set('details', `${id}`);
    setQuery(query);
  };

  return (
    <div className={`resultItem`} onClick={(e) => onClick(e)}>
      <h3>{props.data.name}</h3>
      <div>type: {props.data.astronomicalObjectType}</div>
    </div>
  );
}
