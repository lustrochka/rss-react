import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { CardList } from '../components/cardList/cardList';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { server } from './mocks/server';
import { BASE_URL } from './mocks/handlers';
import { http } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CardList', () => {
  it('renders the specified number of cards', async () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<CardList />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    waitFor(() =>
      expect(container.getElementsByClassName('result-item').length).toBe(2)
    );
  });

  it('message is displayed if no cards are present', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<CardList />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    server.use(
      http.post(`${BASE_URL}/search`, () => {
        const objectsResponse = {
          page: { lastPage: true },
          astronomicalObjects: [],
        };

        return new Response(JSON.stringify(objectsResponse));
      })
    );
    waitFor(() => expect(screen.getByText(/Nothing/)).toBeInTheDocument());
  });
});
