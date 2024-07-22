import { IAstronomicalObject, ISelectedItems } from '../types';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSelected } from '../store/slices/selectedSlice';
import { useEffect, useState } from 'react';
import { useGetObjectQuery } from '../api/api';

interface IMyProps {
  data: IAstronomicalObject;
}

export default function Card(props: IMyProps) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedItems: ISelectedItems = useSelector(
    (state: RootState) => state.selected.selected
  );
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data } = useGetObjectQuery(props.data.uid.toString(), {
    skip: !shouldFetch,
  });

  useEffect(() => {
    if (data) dispatch(setSelected(changeSelectedItems()));
  }, [data]);

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

  const changeSelectedItems = () => {
    const selectedItemsCopy = { ...selectedItems };
    selectedItemsCopy[props.data.uid.toString()] = {
      name: data?.astronomicalObject.name || '',
      type: data?.astronomicalObject.astronomicalObjectType || '',
      ...(data?.astronomicalObject.location && {
        location: `${data.astronomicalObject.location.name}, ${data.astronomicalObject.location.location.name}`,
      }),
    };
    return selectedItemsCopy;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (!data) {
        setShouldFetch(true);
      } else {
        dispatch(setSelected(changeSelectedItems()));
      }
    } else {
      const selectedItemsCopy = { ...selectedItems };
      delete selectedItemsCopy[props.data.uid];
      dispatch(setSelected(selectedItemsCopy));
    }
  };

  return (
    <div className="result-item" onClick={(e) => onClick(e)}>
      <h3>{props.data.name}</h3>
      <div>type: {props.data.astronomicalObjectType}</div>
      <input
        type="checkbox"
        className="card-checkbox"
        checked={props.data.uid in selectedItems}
        onChange={(e) => handleChange(e)}
      ></input>
    </div>
  );
}
