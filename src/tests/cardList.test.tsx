import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { CardList } from '../components/cardList/cardList';
import React from 'react';

jest.mock('../hooks/useSetQuery', () => ({
  useSetQuery: jest.fn().mockReturnValue([new URLSearchParams(), jest.fn()]),
}));

const data = [
  { name: 'Sun', astronomicalObjectType: 'Star', uid: 0 },
  { name: 'Some planet', astronomicalObjectType: 'Planet', uid: 1 },
];

describe('CardList', () => {
  it('renders the specified number of cards', async () => {
    const { container } = render(<CardList data={data} />);
    waitFor(() =>
      expect(container.getElementsByClassName('result-item').length).toBe(2)
    );
  });

  it('message is displayed if no cards are present', () => {
    render(<CardList data={[]} />);
    waitFor(() => expect(screen.getByText(/Nothing/)).toBeInTheDocument());
  });
});
