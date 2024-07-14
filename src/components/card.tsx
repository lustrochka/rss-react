import { IResponseItem } from '../types';
import { useSearchParams } from 'react-router-dom';

interface IMyProps {
  data: IResponseItem;
}

export default function Card(props: IMyProps) {
  const [, setSearchParams] = useSearchParams();
  const goToItem = (id: number) => {
    setSearchParams({ details: `${id}` });
  };
  return (
    <div className="result-item" onClick={() => goToItem(props.data.uid)}>
      <h3>{props.data.name}</h3>
      <div>type: {props.data.astronomicalObjectType}</div>
    </div>
  );
}
