import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import NProgress from "nprogress";
import { ElMessage } from "element-plus";
import { router } from "@/router";
// 数据返回的接口
// 定义请求响应参数，不含data
interface Result {
  statusCode: number;
  message: string;
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
  data?: T;
}
const URL: string = "";
enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 401, // 登录失效
  FAIL = 400, // 请求失败
  SUCCESS = 200, // 请求成功
}
const config = {
  // 默认地址
  baseURL: URL as string,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);
    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */

    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        NProgress.done();
        const token =
          JSON.parse(window.localStorage.getItem("userInfo")) === null
            ? null
            : JSON.parse(window.localStorage.getItem("userInfo")).userInfo
                .access_token;
        return {
          ...config,
          headers: {
            Authorization: "Bearer " + token, // 请求头中携带token信息
          },
        };
      },
      (error: AxiosError) => {
        // 请求报错
        NProgress.done();
        return Promise.reject(error);
      }
    );
    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response; // 解构
        if (data.statusCode === RequestEnums.OVERDUE) {
          NProgress.done();
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          localStorage.setItem("token", ""); // router.replace({ //   path: '/login' // })
          return Promise.reject(data);
        } // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.statusCode && data.statusCode !== RequestEnums.SUCCESS) {
          NProgress.done();
          ElMessage.error(data.message); // 此处也可以使用组件提示报错信息
          return Promise.reject(data);
        }
        return data;
      },
      (error: AxiosError) => {
        const { response } = error;
        if (response) {
          NProgress.done();
          this.handleCode(response.data);
          return Promise.reject(response.data);
        }
        if (!window.navigator.onLine) {
          NProgress.done();
          ElMessage.error("网络连接失败"); // 可以跳转到错误页面，也可以不做操作 // return router.replace({ //   path: '/404' // });
          return Promise.reject(response.data);
        }
      }
    );
  }
  handleCode(err): void {
    switch (err.statusCode) {
      case 401:
        NProgress.done();
        ElMessage.error(err.message);
        router.push({ name: "login" });
        break;
      default:
        NProgress.done();
        ElMessage.error(err.message);
        break;
    }
  }

  // 常用方法封装
  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    NProgress.start();
    return this.service.get(url, { params });
  }
  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    NProgress.start();
    return this.service.post(url, params);
  }
  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    NProgress.start();
    return this.service.put(url, params);
  }
  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    NProgress.start();
    return this.service.delete(url, { params });
  }
}

// 导出一个实例对象
export default new RequestHttp(config);
