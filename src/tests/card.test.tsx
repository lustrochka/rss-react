import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '../components/card/card';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import React from 'react';

jest.mock('../hooks/useSetQuery', () => ({
  useSetQuery: jest.fn().mockReturnValue([new URLSearchParams(), jest.fn()]),
}));

render(
  <Card data={{ uid: 8, name: 'Sun', astronomicalObjectType: 'Star' }}></Card>
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
    waitFor(() => {
      const card = screen.getByText(/Sun/);
      userEvent
        .click(card)
        .then(() => waitFor(() => expect(mockGet).toHaveBeenCalled()));
    });
  });
});
