import { Loader } from '../loader/loader';
import { RootState } from '../../store/store';
import React from 'react';
import { useSetQuery } from '../../hooks/useSetQuery';
import { useSelector } from 'react-redux';
import { IObjectResponse } from '../../types';
import styles from './details.module.scss';

interface IMyProps {
  id: string;
}

export function DetailedPage(props: IMyProps) {
  const data: Partial<IObjectResponse> = useSelector(
    (state: RootState) => state.object.object
  );
  const isLoading = useSelector(
    (state: RootState) => state.isLoading.isDetailsLoading
  );
  const [query, setQuery] = useSetQuery();

  const changeUrl = () => {
    query.delete('details');
    setQuery(query);
  };

  return (
    <div className={styles.details}>
      <div className={styles.closeButton} onClick={changeUrl}>
        ✖
      </div>
      <div className={styles.details__item}>
        {isLoading && <Loader />}
        {Object.keys(data).length > 0 && (
          <>
            <h2>{data.name}</h2>
            <div>{data.astronomicalObjectType}</div>
            {data.location && (
              <div>{`${data.location.name}, ${data.location.location.name}`}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
