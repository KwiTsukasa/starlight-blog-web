import axios from '@/plugins/axios';

export const getLogin = (params: LoginForm) => {
  return axios.post<any>({ url: '/api/auth/login', params });
};

export const getRegister = (params: RegisterForm) => {
  return axios.post<any>({ url: '/api/user/Register', params });
};
