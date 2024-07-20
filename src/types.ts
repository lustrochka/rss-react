export type SearchParams = {
  pageNumber: number;
  pageSize: number;
  name?: string;
};

export interface IObjectsResponse {
  astronomicalObjects: IAstronomicalObject[];
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
