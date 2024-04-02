import { AxiosResponse } from "axios";
import http from "../utils/http";
import { IGroup } from "../types/group.type";
import { IResponse } from "../types/user.type";

export const getAllGroups = async () => {
  const res: AxiosResponse<IResponse<IGroup[]>> = await http.get("groups");
  return res;
};
