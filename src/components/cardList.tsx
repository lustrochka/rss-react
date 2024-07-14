import { IResponseItem } from '../types';
import Card from './card';

interface IMyProps {
  class: string;
  data: IResponseItem[];
}

export function CardList(props: IMyProps) {
  const nothingClass = props.data.length > 0 ? 'nothing hiding' : 'nothing';
  return (
    <>
      <div className={props.class}>
        <h2 className={nothingClass}>Nothing found :(</h2>
        <div className="result-container">
          {props.data.map((item: IResponseItem) => (
            <Card key={item.uid.toString()} data={item} />
          ))}
        </div>
      </div>
    </>
  );
}
