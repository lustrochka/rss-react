import { Search } from '../search/search';
import { CardList } from '../cardList/cardList';
import Pagination from '../pagination/pagination';
import { Loader } from '../loader/loader';
import ThemeButton from '../themeButton/themeButton';
import React from 'react';
import { IObjectsResponse } from '../../types';

export async function Page({ data }: { data: IObjectsResponse }) {
  return (
    <>
      <div className="mainPage">
        <div className="topSection">
          <Search />
          <ThemeButton></ThemeButton>
        </div>
        <div className="bottomSection">
          <Loader />
          <CardList data={data.astronomicalObjects} />
          <Pagination isLast={data.page.lastPage} />
        </div>
      </div>
    </>
  );
}
