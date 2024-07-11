import { IResponseItem } from '../types';

interface IMyProps {
  class: string;
  data: IResponseItem[];
}

export function SearchResults(props: IMyProps) {
  return (
    <div className={props.class}>
      <div className="result-container">
        {props.data.map((item: IResponseItem) => (
          <div key={item.uid.toString()} className="result-item">
            <h3>{item.name}</h3>
            <div>type: {item.astronomicalObjectType}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
