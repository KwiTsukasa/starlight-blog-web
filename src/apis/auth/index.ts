import axios from "@/plugins/axios";

export const refreshToken: any = (params) => {
  return axios.post<any>("/api/auth/refreshToken", params);
};
