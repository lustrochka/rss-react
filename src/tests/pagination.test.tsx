import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Pagination from '../components/pagination/pagination';
import userEvent from '@testing-library/user-event';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { server } from './mocks/server';
import React from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../mocks/createMockRouter';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CardList', () => {
  it('changes query params when clicking', () => {
    render(
      <Provider store={store}>
        <RouterContext.Provider value={createMockRouter({})}>
          <Pagination />
        </RouterContext.Provider>
      </Provider>
    );
    const btn = screen.getByText(/🠚/i);
    userEvent
      .click(btn)
      .then(() =>
        waitFor(() =>
          expect(new URLSearchParams(window.location.href).get('page')).toBe(
            '2'
          )
        )
      );
  });
});
