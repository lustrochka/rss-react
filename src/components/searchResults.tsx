import { IResponseItem } from '../types';
import { useSearchParams } from 'react-router-dom';

interface IMyProps {
  class: string;
  data: IResponseItem[];
}

export function SearchResults(props: IMyProps) {
  const [, setSearchParams] = useSearchParams();
  const goToItem = (id: number) => {
    setSearchParams({ details: `${id}` });
  };

  return (
    <div className={props.class}>
      <div className="result-container">
        {props.data.map((item: IResponseItem) => (
          <div
            key={item.uid.toString()}
            className="result-item"
            onClick={() => goToItem(item.uid)}
          >
            <h3>{item.name}</h3>
            <div>type: {item.astronomicalObjectType}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
