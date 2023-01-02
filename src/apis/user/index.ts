import axios from '@/plugins/axios'

export const getUserInfo:any = () => {
    return axios.get<any>('/api/user/SelectUser');
} 