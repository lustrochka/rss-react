import { useRouter } from 'next/router';
import { Page } from '../components/page/page';
import { DetailedPage } from '../components/detailedPage/detailedPage';
import { setObjects } from '../store/slices/objectsSlice';
import { setObject } from '../store/slices/objectSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { IAstronomicalObject, IObjectResponse } from '../types';
import { GetServerSideProps } from 'next';
import { setIsLast } from '../store/slices/isLastSlice';
import { RootState } from '../store/store';
import {
  setIsLoading,
  setIsDetailsLoading,
} from '../store/slices/isLoadingSlice';
import React, { useEffect } from 'react';

interface IMyProps {
  data: IAstronomicalObject[] | IAstronomicalObject;
  isDetailed: boolean;
  isLast?: boolean;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const BASE_URL = 'http://stapi.co/api/v1/rest/astronomicalObject';
  const { query } = context;
  const page = Number(query.page) || 1;
  const searchString = query.search;
  const details = query.details;

  const params = {
    pageNumber: page,
    pageSize: 10,
    ...(searchString && { name: searchString }),
  };

  try {
    if (details) {
      const res = await axios.get(BASE_URL, { params: { uid: details } });

      const astronomicalObject = res.data.astronomicalObject || [];
      return {
        props: {
          data: astronomicalObject,
          isDetailed: true,
        },
      };
    } else {
      const res = await axios.post(
        `${BASE_URL}/search`,
        {},
        {
          params,
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const astronomicalObjects = res.data.astronomicalObjects || [];
      const isLast = res.data.page.lastPage;
      return {
        props: {
          data: astronomicalObjects,
          isDetailed: false,
          isLast,
        },
      };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        astronomicalObjects: [],
      },
    };
  }
};

export default function Home({ data, isDetailed, isLast }: IMyProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.isLoading.isLoading
  );
  const isDetailsLoading = useSelector(
    (state: RootState) => state.isLoading.isDetailsLoading
  );
  const details =
    typeof router.query.details === 'string' ? router.query.details : '';

  useEffect(() => {
    isDetailed ? dispatch(setObject(data)) : dispatch(setObjects(data));
    if (isLast !== undefined) dispatch(setIsLast(isLast));
  }, [data, isDetailed, isLast]);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      if (url.includes('details'))
        dispatch(setIsDetailsLoading({ isDetailsLoading: true }));
    };

    const handleRouteChangeComplete = (url: string) => {
      if (url.includes('details'))
        dispatch(setIsDetailsLoading({ isDetailsLoading: false }));
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <div className="page">
      <Page></Page>
      {details && <DetailedPage id={details} />}
    </div>
  );
}
