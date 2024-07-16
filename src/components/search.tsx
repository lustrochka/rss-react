import { useSearchParams } from 'react-router-dom';
import useSearchQuery from '../hooks/useSearchQuery';

interface IMyProps {
  callback: (searchString: string) => void;
}

export function Search(props: IMyProps) {
  const [searchString, setSearchString, saveSearchString] = useSearchQuery();
  const [, setSearchParams] = useSearchParams();

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
            props.callback(searchString);
          }}
        ></div>
      </div>
    </div>
  );
}
