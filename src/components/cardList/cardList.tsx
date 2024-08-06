import { IAstronomicalObject } from '../../types';
import Card from '../card/card';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import React from 'react';
import styles from './cardList.module.scss';

export function CardList() {
  const objectsData: IAstronomicalObject[] = useSelector(
    (state: RootState) => state.objects.objects
  );
  const isLoading: boolean = useSelector(
    (state: RootState) => state.isLoading.isLoading
  );

  return (
    <>
      {!isLoading && objectsData && (
        <div className={styles.results}>
          {objectsData.length === 0 && <h2 className="">Nothing found</h2>}
          <div className={styles.resultContainer}>
            {objectsData.map((item: IAstronomicalObject) => (
              <Card key={item.uid.toString()} data={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
