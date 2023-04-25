import axios from '@/plugins/axios'

export const getList:any = () => {
    return axios.get<any>({url:'/api/blog/getMyListBlog'});
}