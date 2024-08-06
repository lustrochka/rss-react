import useSearchQuery from '../../hooks/useSearchQuery';
import { useGetObjectsMutation } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setObjects } from '../../store/slices/objectsSlice';
import { setIsLoading } from '../../store/slices/isLoadingSlice';
import { setIsLast } from '../../store/slices/isLastSlice';
import { useEffect, useContext } from 'react';
import ThemeContext from '../../context/themeContext';
import { useSetQuery } from '../../hooks/useSetQuery';
import React from 'react';
import styles from './search.module.scss';

export function Search() {
  const { theme } = useContext(ThemeContext);
  const [searchString, setSearchString, saveSearchString] = useSearchQuery();
  const [query, setQuery] = useSetQuery();
  const pageNumber = (Number(query.get('page')) || 1) - 1;
  const [getObjects, { isLoading }] = useGetObjectsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);

  useEffect(() => {
    search();
  }, [pageNumber]);

  const search = () => {
    getObjects({ searchString, pageNumber }).then(({ data }) => {
      dispatch(setObjects(data?.astronomicalObjects));
      dispatch(setIsLast(data?.page.lastPage));
    });
  };

  return (
    <div
      className={
        theme === 'light'
          ? `${styles.searchBlock} ${styles.searchBlock_light}`
          : styles.searchBlock
      }
    >
      <div>Find astronomical object</div>
      <div
        className={
          theme === 'light'
            ? `${styles.search} ${styles.search_light}`
            : styles.search
        }
      >
        <input
          type="search"
          value={searchString}
          className={styles.searchInput}
          onChange={(event) => setSearchString(event.target.value.trim())}
        ></input>
        <div
          className={styles.loupe}
          onClick={() => {
            saveSearchString();
            query.set('page', '1');
            setQuery(query);
            search();
          }}
        ></div>
      </div>
    </div>
  );
}
