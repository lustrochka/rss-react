import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { CardList } from '../components/cardList';
import { IResponseItem } from '../types';

/*const searchString = '';
const setSearchString = jest.fn();
const setBeers = jest.fn();*/

describe('CardList', () => {
  it('renders the specified number of cards', () => {
    const results: IResponseItem[] = [
      { name: 'Some star', astronomicalObjectType: 'Star', uid: 0 },
      { name: 'Some planet', astronomicalObjectType: 'Planet', uid: 1 },
    ];
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<CardList class="results" data={results} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    );
    expect(container.getElementsByClassName('result-item').length).toBe(
      results.length
    );
  });
  it('message is displayed if no cards are present', () => {
    const results: IResponseItem[] = [];
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<CardList class="results" data={results} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByText(/Nothing/)).toBeInTheDocument();
  });
});
