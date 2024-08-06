import { IAstronomicalObject, ISelectedItems } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const setQuery = useSetQuery();
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
    const query = router.asPath.split('?')[1];
    const newSearchParams = new URLSearchParams(query);
    newSearchParams.set('details', `${id}`);
    setQuery(newSearchParams);
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
