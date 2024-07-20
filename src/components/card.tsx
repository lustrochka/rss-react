import { IAstronomicalObject } from '../types';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSelected } from '../store/slices/selectedSlice';

interface IMyProps {
  data: IAstronomicalObject;
}

export default function Card(props: IMyProps) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedItems: number[] = useSelector(
    (state: RootState) => state.selected.selected
  );
  const selectedItemsCopy = new Set(selectedItems);

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target instanceof HTMLElement) {
      if (!e.target.classList.contains('card-checkbox'))
        goToItem(props.data.uid);
    }
  };

  const goToItem = (id: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('details', `${id}`);
    setSearchParams(newSearchParams);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? selectedItemsCopy.add(props.data.uid)
      : selectedItemsCopy.delete(props.data.uid);
    dispatch(setSelected([...selectedItemsCopy]));
  };

  return (
    <div className="result-item" onClick={(e) => onClick(e)}>
      <h3>{props.data.name}</h3>
      <div>type: {props.data.astronomicalObjectType}</div>
      <input
        type="checkbox"
        className="card-checkbox"
        checked={selectedItems.includes(props.data.uid)}
        onChange={(e) => handleChange(e)}
      ></input>
    </div>
  );
}
