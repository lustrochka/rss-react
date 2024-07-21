import { Search } from './search';
import { CardList } from './cardList';
import Pagination from './pagination';
import '../App.scss';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Flyout from './flyout/flyout';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Loader } from './loader';

export function Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const isLoading: boolean = useSelector(
    (state: RootState) => state.isLoading.isLoading
  );

  useEffect(() => {
    if (error) throw new Error('This is an error');
  }, [error]);

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
          <button
            className="error-button"
            onClick={() => {
              setError(true);
            }}
          >
            Make an error
          </button>
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
