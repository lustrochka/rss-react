import axios from 'axios';

export const BASE_URL = 'http://stapi.co/api/v1/rest/astronomicalObject';

export async function getObjects(searchParams) {
  const page = searchParams.page || 1;
  const searchString = searchParams.search ? searchParams.search : null;
  const params = {
    pageNumber: page,
    pageSize: 10,
    ...(searchString && { name: searchString }),
  };

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

  return res.data;
}

export async function getDetails(id: string) {
  const res = await axios.get(BASE_URL, { params: { uid: id } });
  return res;
}
