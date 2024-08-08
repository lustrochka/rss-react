import useSearchQuery from '../../hooks/useSearchQuery';
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
  const [query, setQuery] = useSetQuery();
  const [searchString, setSearchString, saveSearchString] = useSearchQuery();
  const dispatch = useDispatch();

  const setParams = () => {
    searchString.length > 0
      ? query.set('search', `${searchString}`)
      : query.delete('search');
    setQuery(query);
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
            setParams();
          }}
        ></div>
      </div>
    </div>
  );
}
