import axios from 'axios';
import { SearchParams } from '../types';
import { Search } from './search';
import { Loader } from './loader';
import { SearchResults } from './searchResults';
import '../App.scss';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loadingClass, setLoadingClass] = useState('loading');
  const [resClass, setResClass] = useState('results hiding');
  const [nothingClass, setNothingClass] = useState('not-found hiding');
  const [error, setError] = useState(false);

  useEffect(() => {
    search(localStorage.getItem('searchString') || '');
    if (error) throw new Error('This is an error');
  }, []);

  const load = () => {
    setLoadingClass('loading');
    setResClass('results hiding');
    setNothingClass('not-found hiding');
  };

  const changeUrl = () => {
    if (searchParams.get('details')) {
      searchParams.delete('details');
      setSearchParams(searchParams);
    }
  };

  const search = (searchString: string) => {
    const BASE_URL = 'http://stapi.co/api/v1/rest/astronomicalObject/search';
    const params: SearchParams = { pageNumber: 0, pageSize: 10 };
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
        if (res.data.astronomicalObjects.length > 0) {
          setLoadingClass('loading hiding');
          setResClass('results');
          setNothingClass('not-found hiding');
          setResults(res.data.astronomicalObjects);
        } else {
          setLoadingClass('loading hiding');
          setNothingClass('not-found');
        }
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
          <h2 className={nothingClass}>Nothing found :(</h2>
          <SearchResults class={resClass} data={results} />
        </div>
      </div>
    </>
  );
}
