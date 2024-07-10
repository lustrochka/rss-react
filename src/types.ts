export type SearchParams = {
  pageNumber: number;
  pageSize: number;
  name?: string;
};

export interface IResponseItem {
  uid: number;
  name: string;
  astronomicalObjectType: string;
}
