import axios from "@/plugins/axios";

export const getLogin: any = (params: LoginForm) => {
  return axios.get<any>("/api/user/login", params);
};

export const getRegister: any = (params: RegisterForm) => {
  return axios.get<any>("/api/user/Register", params);
};
