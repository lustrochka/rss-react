import { IAstronomicalObject } from '../../types';
import Card from '../card/card';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './cardList.scss';

export function CardList() {
  const objectsData: IAstronomicalObject[] = useSelector(
    (state: RootState) => state.objects.objects
  );
  const isLoading: boolean = useSelector(
    (state: RootState) => state.isLoading.isLoading
  );

  return (
    <>
      {!isLoading && objectsData && (
        <div className="results">
          {objectsData.length === 0 && <h2 className="">Nothing found</h2>}
          <div className="result-container">
            {objectsData.map((item: IAstronomicalObject) => (
              <Card key={item.uid.toString()} data={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
