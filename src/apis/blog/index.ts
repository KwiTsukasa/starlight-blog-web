import axios from '@/plugins/axios';

export const getAllBlog: any = (params) => {
  return axios.get<any>({ url: '/api/auth/blog', params });
};
