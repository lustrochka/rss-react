import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Pagination from '../components/pagination/pagination';
import userEvent from '@testing-library/user-event';
import React from 'react';

jest.mock('../hooks/useSetQuery', () => ({
  useSetQuery: jest.fn().mockReturnValue([new URLSearchParams(), jest.fn()]),
}));

describe('Pagination', () => {
  it('changes query params when clicking', () => {
    render(<Pagination isLast={false} />);
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
