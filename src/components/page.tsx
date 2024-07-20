import { Search } from './search';
import { Loader } from './loader';
import { CardList } from './cardList';
import Pagination from './pagination';
import '../App.scss';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Flyout from './flyout/flyout';

export function Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loadingClass, setLoadingClass] = useState('loading');
  const [error, setError] = useState(false);
  const [isLastPage] = useState(false);
  const page = Number(searchParams.get('page')) - 1 || 0;

  useEffect(() => {
    if (error) throw new Error('This is an error');
    load();
  }, [page]);

  const load = () => {
    setLoadingClass('loading');
  };

  const changeUrl = () => {
    if (searchParams.get('details')) {
      searchParams.delete('details');
      setSearchParams(searchParams);
    }
  };

  /*const search = (searchString: string) => {
    const BASE_URL = 'http://stapi.co/api/v1/rest/astronomicalObject/search';
    const params: SearchParams = { pageNumber: page, pageSize: 10 };
    if (searchString) params.name = searchString;
    axios
      .post(
        BASE_URL,
        {},
        {
          params,
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((res) => {
        setLoadingClass('loading hiding');
        setIsLastPage(res.data.page.lastPage);
      });
  };*/

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
          <Loader class={loadingClass} />
          <CardList />
          <Pagination isLast={isLastPage} />
          <Flyout></Flyout>
        </div>
      </div>
    </>
  );
}
