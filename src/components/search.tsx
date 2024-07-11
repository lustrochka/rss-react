import searchUrl from '../assets/drawing-2.svg';
import { useState } from 'react';

interface IMyProps {
  callback: (searchString: string) => void;
}

export function Search(props: IMyProps) {
  const [searchString, setSearchString] = useState(
    localStorage.getItem('searchString') || ''
  );

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
            localStorage.setItem('searchString', searchString);
            props.callback(searchString);
          }}
        >
          <img src={searchUrl}></img>
        </div>
      </div>
    </div>
  );
}
