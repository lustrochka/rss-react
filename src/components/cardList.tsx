import { IAstronomicalObject } from '../types';
import Card from './card';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export function CardList() {
  //const nothingClass = props.data.length > 0 ? 'nothing hiding' : 'nothing';
  const objectsData: IAstronomicalObject[] = useSelector(
    (state: RootState) => state.objects.objects
  );
  return (
    <>
      <div className="results">
        {objectsData.length === 0 && <h2 className="">Nothing found</h2>}
        <div className="result-container">
          {objectsData.map((item: IAstronomicalObject) => (
            <Card key={item.uid.toString()} data={item} />
          ))}
        </div>
      </div>
    </>
  );
}
