import { useSearchParams } from 'react-router-dom';
import searchUrl from '../assets/drawing-2.svg';
import useSearchQuery from '../hooks/useSearchQuery';

interface IMyProps {
  callback: (searchString: string) => void;
}

export function Search(props: IMyProps) {
  const [getSearchString, setSearchString, saveSearchString] = useSearchQuery();
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="search-block">
      <div>Find astronomical object</div>
      <div className="search">
        <input
          type="search"
          value={getSearchString()}
          className="search-input"
          onChange={(event) => setSearchString(event.target.value.trim())}
        ></input>
        <div
          className="loupe"
          onClick={() => {
            saveSearchString();
            setSearchParams({ page: '0' });
            props.callback(getSearchString());
          }}
        >
          <img src={searchUrl}></img>
        </div>
      </div>
    </div>
  );
}
