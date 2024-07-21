import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IObjectsResponse,
  RequestSearchParams,
  IObjectResponse,
} from '../types';

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
      }) => {
        const params = {
          pageNumber,
          pageSize: 10,
        };

        const body = new URLSearchParams();
        if (searchString) {
          body.append('name', searchString);
        }
        return {
          url: '/search',
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params,
          body: body.toString(),
        };
      },
    }),
    getObject: build.query<IObjectResponse, string>({
      query: (id: string) => `?uid=${id}`,
    }),
  }),
});

export const { useGetObjectsMutation, useGetObjectQuery } = stapi;
