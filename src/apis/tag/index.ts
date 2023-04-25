import axios from "@/plugins/axios";

export const getList: any = (params) => {
  return axios.get<any>({ url: "/api/tag/getList", params });
};

export const getTagKv: any = () => {
  return axios.get<any>({ url: "/api/tag/getTagKv" });
};
