import { Search } from '../search/search';
import { CardList } from '../cardList/cardList';
import Pagination from '../pagination/pagination';
import { useSearchParams } from 'react-router-dom';
import Flyout from '../flyout/flyout';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Loader } from '../loader/loader';
import './page.scss';

export function Page() {
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
      <div className="main-page" onClick={changeUrl}>
        <div className="top-section">
          <Search />
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