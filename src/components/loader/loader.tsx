import React from 'react';
import styles from './loader.module.scss';

export function Loader() {
  return (
    <div className={styles.loading}>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div key={index} className="bubble"></div>
      ))}
    </div>
  );
}
