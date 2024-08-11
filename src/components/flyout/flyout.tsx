import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSelected } from '../../store/slices/selectedSlice';
import { ISelectedItems } from '../../types';
import ThemeContext from '../../context/themeContext';
import React, { useContext } from 'react';
import styles from './flyout.module.scss';

export default function Flyout() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const selectedItems: ISelectedItems = useSelector(
    (state: RootState) => state.selected.selected
  );

  const convertToCSV = () => {
    const keys = Object.keys(Object.values(selectedItems)[0]).join(',');
    const values = Object.values(selectedItems).map((item) =>
      Object.values(item).join(',')
    );
    return [keys, ...values].join('\n');
  };

  const downloadCSV = () => {
    const csv = convertToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    return URL.createObjectURL(blob);
  };

  return (
    <>
      {Object.keys(selectedItems).length > 0 && (
        <div
          className={
            theme === 'light'
              ? `${styles.flyout} ${styles.flyout_light}`
              : styles.flyout
          }
        >
          <h3 className={styles.flyout__title}>
            {Object.keys(selectedItems).length} item
            {Object.keys(selectedItems).length > 1 && 's'} selected
          </h3>
          <div className={styles.flyout__buttons}>
            <button
              className={theme === 'light' ? `${styles.button_light}` : ''}
              onClick={() => dispatch(setSelected([]))}
            >
              Unselect all
            </button>
            <a href={downloadCSV()} download="astronomical objects.csv">
              <button
                className={theme === 'light' ? `${styles.button_light}` : ''}
              >
                Download
              </button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
