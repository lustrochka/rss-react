import { Search } from '../search/search';
import { CardList } from '../cardList/cardList';
import Pagination from '../pagination/pagination';
import { useSearchParams } from 'react-router-dom';
import Flyout from '../flyout/flyout';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Loader } from '../loader/loader';
import ThemeButton from '../themeButton/themeButton';
import { useContext } from 'react';
import ThemeContext from '../../context/themeContext';
import './page.scss';

export function Page() {
  const { theme } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoading: boolean = useSelector(
    (state: RootState) => state.isLoading.isLoading
  );

  const changeUrl = () => {
    if (searchParams.get('details')) {
      searchParams.delete('details');
      setSearchParams(searchParams);
    }
  };

  return (
    <>
      <div
        className={theme === 'light' ? 'main-page light' : 'main-page'}
        onClick={changeUrl}
      >
        <div className="top-section">
          <Search />
          <ThemeButton></ThemeButton>
        </div>
        <div className="bottom-section">
          {isLoading && <Loader />}
          <CardList />
          {!isLoading && <Pagination />}
          <Flyout></Flyout>
        </div>
      </div>
    </>
  );
}
