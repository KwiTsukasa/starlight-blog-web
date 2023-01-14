import axios from "@/plugins/axios";

export const getAllBlog: any = (params) => {
  return axios.get<any>("/api/auth/blog", params);
};