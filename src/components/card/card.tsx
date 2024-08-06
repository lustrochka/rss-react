import { IAstronomicalObject, ISelectedItems } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSelected } from '../../store/slices/selectedSlice';
import { useEffect, useState, useContext } from 'react';
import { useGetObjectQuery } from '../../api/api';
import { useSetQuery } from '../../hooks/useSetQuery';
import ThemeContext from '../../context/themeContext';
import React from 'react';
import styles from './card.module.scss';

interface IMyProps {
  data: IAstronomicalObject;
}

export default function Card(props: IMyProps) {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [query, setQuery] = useSetQuery();
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
      if (!e.target.classList.contains(styles.cardCheckbox))
        goToItem(props.data.uid);
    }
  };

  const goToItem = (id: number) => {
    query.set('details', `${id}`);
    setQuery(query);
  };

  const checkLocation = (location) => {
    if (!location) {
      return '';
    } else if (!location.location) {
      return `${location.name}`;
    }
    return `${location.name}, ${location.location.name}`;
  };

  const changeSelectedItems = () => {
    const selectedItemsCopy = { ...selectedItems };
    selectedItemsCopy[props.data.uid.toString()] = {
      name: data?.astronomicalObject.name || '',
      type: data?.astronomicalObject.astronomicalObjectType || '',
      location: checkLocation(data?.astronomicalObject.location),
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
    <div
      className={
        theme === 'light'
          ? `${styles.resultItem} ${styles.resultItem_light}`
          : styles.resultItem
      }
      onClick={(e) => onClick(e)}
    >
      <h3>{props.data.name}</h3>
      <div>type: {props.data.astronomicalObjectType}</div>
      <input
        type="checkbox"
        className={styles.cardCheckbox}
        checked={props.data.uid in selectedItems}
        onChange={(e) => handleChange(e)}
      ></input>
    </div>
  );
}
