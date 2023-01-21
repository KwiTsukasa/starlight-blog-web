import axios from "@/plugins/axios";

export const getList: any = (params) => {
  return axios.get<any>("/api/group/getList", params);
};

export const getGroupKv: any = () => {
  return axios.get<any>("/api/group/getGroupKv");
};