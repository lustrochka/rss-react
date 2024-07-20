import { useSearchParams } from 'react-router-dom';
import useSearchQuery from '../hooks/useSearchQuery';
import { useGetObjectsMutation } from '../api/api';
import { useDispatch } from 'react-redux';
import { setObjects } from '../store/slices/objectsSlice';
import { useEffect } from 'react';

export function Search() {
  const [searchString, setSearchString, saveSearchString] = useSearchQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = (Number(searchParams.get('page')) || 1) - 1;
  const [getObjects, { data }] = useGetObjectsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    search();
  }, [pageNumber]);

  const search = () => {
    getObjects({ searchString, pageNumber }).then(() => {
      dispatch(setObjects(data?.astronomicalObjects));
    });
  };

  return (
    <div className="search-block">
      <div>Find astronomical object</div>
      <div className="search">
        <input
          type="search"
          value={searchString}
          className="search-input"
          onChange={(event) => setSearchString(event.target.value.trim())}
        ></input>
        <div
          className="loupe"
          onClick={() => {
            saveSearchString();
            setSearchParams({ page: '1' });
            search();
          }}
        ></div>
      </div>
    </div>
  );
}
