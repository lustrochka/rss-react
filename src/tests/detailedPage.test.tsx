import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { DetailedPage } from '../components/detailedPage/detailedPage';
import userEvent from '@testing-library/user-event';
import React from 'react';

jest.mock('../hooks/useSetQuery', () => ({
  useSetQuery: jest.fn().mockReturnValue([new URLSearchParams(), jest.fn()]),
}));

const data = {
  data: {
    astronomicalObject: {
      uid: 'ASMA0000289027',
      name: '1 Centauri',
      astronomicalObjectType: 'STAR_SYSTEM',
      location: {
        uid: 'ASMA0000002015',
        name: 'Beta Quadrant',
        astronomicalObjectType: null,
        location: {
          uid: 'ASMA0000002775',
          name: 'Milky Way Galaxy',
        },
      },
      astronomicalObjects: [],
    },
  },
};

const { container } = render(<DetailedPage data={data} />);

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
