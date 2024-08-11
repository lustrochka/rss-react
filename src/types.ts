export type SearchParams = {
  pageNumber: number;
  pageSize: number;
  name?: string;
};

export interface IObjectsResponse {
  page: { lastPage: boolean };
  astronomicalObjects: IAstronomicalObject[];
}

export interface IObjectResponse {
  name: string;
  astronomicalObjectType: string;
  location?: {
    name: string;
    location: {
      name: string;
    };
  };
}

export interface IAstronomicalObject {
  uid: number;
  name: string;
  astronomicalObjectType: string;
}

export interface RequestSearchParams {
  pageNumber: number;
  searchString?: string;
}

export interface ISelectedItems {
  [id: string]: {
    name: string;
    type: string;
    location?: string;
  };
}
