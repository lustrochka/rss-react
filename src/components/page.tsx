import axios from 'axios';
import { SearchParams } from '../types';
import { Search } from './search';
import { Loader } from './loader';
import { CardList } from './cardList';
import Pagination from './pagination';
import '../App.scss';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearchQuery from '../hooks/useSearchQuery';

export function Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loadingClass, setLoadingClass] = useState('loading');
  const [resClass, setResClass] = useState('results hiding');
  const [error, setError] = useState(false);
  const [getQuery] = useSearchQuery();
  const page = Number(searchParams.get('page')) - 1;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (error) throw new Error('This is an error');
    setIsLoaded(false);
    load();
    search(getQuery());
  }, [page]);

  const load = () => {
    setLoadingClass('loading');
    setResClass('results hiding');
  };

  const changeUrl = () => {
    if (searchParams.get('details')) {
      searchParams.delete('details');
      setSearchParams(searchParams);
    }
  };

  const search = (searchString: string) => {
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
        setResClass('results');
        setResults(res.data.astronomicalObjects);
        setIsLastPage(res.data.page.lastPage);
        setIsLoaded(true);
      });
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
          <Search
            callback={(searchString) => {
              load();
              search(searchString);
            }}
          />
        </div>
        <div className="bottom-section">
          <Loader class={loadingClass} />
          <CardList class={resClass} data={results} />
          {isLoaded && <Pagination isLast={isLastPage} />}
        </div>
      </div>
    </>
  );
}
