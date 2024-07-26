import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Search } from '../components/search/search';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Search></Search>}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
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
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Search />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole('searchbox')).toHaveValue('death');
  });
});
