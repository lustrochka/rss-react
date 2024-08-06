import { useContext } from 'react';
import ThemeContext from '../../context/themeContext';
import React from 'react';
import styles from './themeButton.module.scss';

export default function ThemeButton() {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <label className={styles.themeLabel} htmlFor={styles.themeInput}>
        <input
          type="checkbox"
          id={styles.themeInput}
          onChange={toggleTheme}
        ></input>
      </label>
    </>
  );
}
