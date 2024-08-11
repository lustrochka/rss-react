import React from 'react';

export default function ThemeButton() {
  return (
    <>
      <label className="themeLabel" htmlFor="themeInput">
        <input type="checkbox" id="themeInput"></input>
      </label>
    </>
  );
}
