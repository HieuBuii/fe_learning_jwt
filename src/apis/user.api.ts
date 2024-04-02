import { AxiosResponse } from "axios";
import { IDataResponseUser, IQueryParams, IResponse } from "../types/user.type";
import http from "../utils/http";
import { ILoginData, IRegisterData, IUpdateUserData } from "../utils/schemas";

export const register = async (data: IRegisterData) => {
  const res = await http.post("regiter", data);
  return res;
};

export const updateUser = async (data: IUpdateUserData) => {
  const res = await http.put("users/update", data);
  return res;
};

export const login = async (data: ILoginData) => {
  const res = await http.post("login", data);
  return res;
};

export const getListUser = async (params: IQueryParams) => {
  const res: AxiosResponse<IResponse<IDataResponseUser>> = await http.get(
    "users",
    {
      params,
    }
  );
  return res;
};

export const deleteUser = async (data: { ids: string }) => {
  const res = await http.delete("users/delete", { data });
  return res;
};
