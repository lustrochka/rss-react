import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IObjectsResponse, RequestSearchParams } from '../types';

const BASE_URL = 'http://stapi.co/api/v1/rest/astronomicalObject';

export const stapi = createApi({
  reducerPath: 'stapi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getObjects: build.mutation<IObjectsResponse, RequestSearchParams>({
      query: ({
        searchString,
        pageNumber,
      }: {
        searchString: string;
        pageNumber: number;
      }) => ({
        url: '/search',
        method: 'POST',
        params: {
          pageNumber,
          pageSize: 10,
          ...(searchString && { name: searchString }),
        },
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {},
      }),
    }),
    getObject: build.query({
      query: (id: string) => `?uid=${id}`,
    }),
  }),
});

export const { useGetObjectsMutation, useGetObjectQuery } = stapi;
