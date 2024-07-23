import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Pagination from '../components/pagination/pagination';
import userEvent from '@testing-library/user-event';

describe('CardList', () => {
  it('changes query params when clicking', () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Pagination isLast={false} />}></Route>
        </Routes>
      </BrowserRouter>
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
