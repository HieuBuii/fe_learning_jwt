import { IUser } from "./../utils/schemas";
export interface IQueryParams {
  page: number;
  limit: number;
}

export interface IResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface IUserData extends Omit<IUser, "password"> {
  groupId: number | null;
  Group: {
    name: string;
    description: string;
  } | null;
  id: number;
}

export interface IDataResponseUser {
  total: number;
  users: IUserData[];
}
