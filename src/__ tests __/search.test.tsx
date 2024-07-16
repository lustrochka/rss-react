import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Search } from '../components/search';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

jest.mock('../assets/drawing-2.svg', () => jest.fn());

function makeStorage() {
  const store: {
    [key: string]: string;
  } = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },
  };
}

const localStorageMock = makeStorage();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Search', () => {
  it('sets search string into localStorage', async () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <Search
                callback={() => {
                  return;
                }}
              ></Search>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    );
    const spyLoStoRemove = jest.spyOn(localStorage, 'setItem');
    await userEvent.type(screen.getByRole('searchbox'), 'ipa');
    await userEvent.click(container.getElementsByClassName('loupe')[0]);
    expect(spyLoStoRemove).toHaveBeenCalled();
    expect(localStorageMock.getItem('searchString')).toEqual('ipa');
  });

  it('gets search string from localStorage', async () => {
    localStorageMock.setItem('searchString', 'death');
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <Search
                callback={() => {
                  return;
                }}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByRole('searchbox')).toHaveValue('death');
  });
});
