import axios from '@/plugins/axios'

export const getLogin:any = (params:LoginFrom) => {
    return axios.get<any>('/api/user/login',params);
}