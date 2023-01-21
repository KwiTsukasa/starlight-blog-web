import axios from "@/plugins/axios";

export const refreshToken: any = (params) => {
  return axios.get<any>("/api/auth/refreshToken", params);
};
