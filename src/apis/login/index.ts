import axios from "@/plugins/axios";

export const getLogin: any = (params: LoginForm) => {
  return axios.post<any>("/api/auth/login", params);
};

export const getRegister: any = (params: RegisterForm) => {
  return axios.post<any>("/api/user/Register", params);
};
