import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { DetailedPage } from '../components/detailedPage/detailedPage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: () => ['1'],
}));

const { container } = render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<DetailedPage />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

describe('DetailedPage', () => {
  it('shows loader', async () => {
    waitFor(() =>
      expect(container.getElementsByClassName('loading')).toBeInTheDocument()
    );
  });

  it('renders data correctly', async () => {
    waitFor(() => expect(screen.getByText(/Centauri/i)).toBeInTheDocument());
  });

  it('hide element on clicking close button', async () => {
    waitFor(() => {
      const btn = screen.getByText(/✖/i);
      userEvent
        .click(btn)
        .then(() => waitFor(() => expect(btn).not.toBeInTheDocument()));
    });
  });
});
