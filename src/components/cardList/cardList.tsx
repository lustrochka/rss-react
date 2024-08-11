import { IAstronomicalObject } from '../../types';
import Card from '../card/card';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import React from 'react';
import styles from './cardList.module.scss';

export function CardList() {
  const data: IAstronomicalObject[] = useSelector(
    (state: RootState) => state.objects.objects
  );

  return (
    <>
      <div className={styles.results}>
        {data.length === 0 && <h2 className="">Nothing found</h2>}
        <div className={styles.resultContainer}>
          {data.map((item: IAstronomicalObject) => (
            <Card key={item.uid.toString()} data={item} />
          ))}
        </div>
      </div>
    </>
  );
}
