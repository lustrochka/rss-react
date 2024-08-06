import { Loader } from '../loader/loader';
import { useGetObjectQuery } from '../../api/api';
import React from 'react';
import { useSetQuery } from '../../hooks/useSetQuery';
import styles from './details.module.scss';

interface IMyProps {
  id: string;
}

export function DetailedPage(props: IMyProps) {
  const { data, error, isLoading } = useGetObjectQuery(props.id);
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
        {error && <div>Something went wrong...</div>}
        {data && (
          <>
            <h2>{data.astronomicalObject.name}</h2>
            <div>{data.astronomicalObject.astronomicalObjectType}</div>
            {data.astronomicalObject.location && (
              <div>{`${data.astronomicalObject.location.name}, ${data.astronomicalObject.location.location.name}`}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
