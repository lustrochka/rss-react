import { useSearchParams } from 'react-router-dom';
import useSearchQuery from '../../hooks/useSearchQuery';
import { useGetObjectsMutation } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setObjects } from '../../store/slices/objectsSlice';
import { setIsLoading } from '../../store/slices/isLoadingSlice';
import { setIsLast } from '../../store/slices/isLastSlice';
import { useEffect } from 'react';
import './search.scss';

export function Search() {
  const [searchString, setSearchString, saveSearchString] = useSearchQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = (Number(searchParams.get('page')) || 1) - 1;
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
