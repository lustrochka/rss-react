import { Search } from '../search/search';
import { CardList } from '../cardList/cardList';
import Pagination from '../pagination/pagination';
import Flyout from '../flyout/flyout';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Loader } from '../loader/loader';
import ThemeButton from '../themeButton/themeButton';
import { useContext } from 'react';
import ThemeContext from '../../context/themeContext';
import { useRouter } from 'next/router';
import { useSetQuery } from '../../hooks/useSetQuery';
import React from 'react';
import styles from './page.module.scss';

export function Page() {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const setQuery = useSetQuery();
  const isLoading: boolean = useSelector(
    (state: RootState) => state.isLoading.isLoading
  );

  const changeUrl = () => {
    const query = router.asPath.split('?')[1];
    if (router.query.details) {
      const newParams = new URLSearchParams(query);
      newParams.delete('details');
      setQuery(newParams);
    }
  };

  return (
    <>
      <div
        className={
          theme === 'light'
            ? `${styles.mainPage} ${styles.light}`
            : styles.mainPage
        }
        onClick={changeUrl}
      >
        <div className={styles.topSection}>
          <Search />
          <ThemeButton></ThemeButton>
        </div>
        <div className={styles.bottomSection}>
          {isLoading && <Loader />}
          <CardList />
          {!isLoading && <Pagination />}
          <Flyout></Flyout>
        </div>
      </div>
    </>
  );
}
