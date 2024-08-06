import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '../components/card/card';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { server } from './mocks/server';
import { http } from 'msw';
import { BASE_URL } from './mocks/handlers';
import React from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../mocks/createMockRouter';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

render(
  <Provider store={store}>
    <RouterContext.Provider value={createMockRouter({})}>
      <Card
        data={{ uid: 8, name: 'Sun', astronomicalObjectType: 'Star' }}
      ></Card>
    </RouterContext.Provider>
  </Provider>
);

describe('Card', () => {
  it('renders data correctly', async () => {
    expect(screen.getByText(/Sun/)).toBeInTheDocument();
    expect(screen.getByText(/Star/)).toBeInTheDocument();
  });

  it('opens a detailed card component on clicking', async () => {
    waitFor(() => {
      const card = screen.getByText(/Sun/);
      userEvent
        .click(card)
        .then(() =>
          waitFor(() => expect(screen.getByText(/✖/i)).toBeInTheDocument())
        );
    });
  });

  it('triggers an additional API call to fetch detailed information', async () => {
    const mockGet = jest.fn();
    server.use(
      http.get(BASE_URL, () => {
        mockGet();

        return new Response(JSON.stringify({ astronomicalObject: {} }));
      })
    );
    waitFor(() => {
      const card = screen.getByText(/Sun/);
      userEvent
        .click(card)
        .then(() => waitFor(() => expect(mockGet).toHaveBeenCalled()));
    });
  });
});
