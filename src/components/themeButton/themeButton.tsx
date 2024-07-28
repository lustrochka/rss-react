import { useContext } from 'react';
import ThemeContext from '../../context/themeContext';
import './themeButton.scss';

export default function ThemeButton() {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <label className="theme-label" htmlFor="theme-input">
        <input type="checkbox" id="theme-input" onChange={toggleTheme}></input>
      </label>
    </>
  );
}
