import { http } from 'msw';
import { fetch, Headers, Request, Response } from 'cross-fetch';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

export const BASE_URL = 'http://stapi.co/api/v1/rest/astronomicalObject';

export const handlers = [
  http.post(`${BASE_URL}/search`, () => {
    const objectsResponse = {
      page: { lastPage: true },
      astronomicalObjects: [
        { name: 'Sun', astronomicalObjectType: 'Star', uid: 0 },
        { name: 'Some planet', astronomicalObjectType: 'Planet', uid: 1 },
      ],
    };

    return new Response(JSON.stringify(objectsResponse));
  }),

  http.get(BASE_URL, () => {
    const objectResponse = {
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
    };

    return new Response(JSON.stringify(objectResponse));
  }),
];
