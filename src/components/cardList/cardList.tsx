import { IAstronomicalObject } from '../../types';
import Card from '../card/card';
import React from 'react';

export function CardList({ data }: { data: IAstronomicalObject[] }) {
  return (
    <>
      <div className="results">
        {data.length === 0 && <h2 className="">Nothing found</h2>}
        <div className="resultContainer">
          {data.map((item: IAstronomicalObject) => (
            <Card key={item.uid.toString()} data={item} />
          ))}
        </div>
      </div>
    </>
  );
}
