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
  TIMEOUT = 10000,
  OVERDUE = 401, // 登录失效
  FAIL = 400, // 请求失败
  SUCCESS = 200, // 请求成功
}
const allConfig = {
  // 默认地址
  baseURL: URL as string,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

let isRefresh = false;
let promiseArr = [];

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
      async (config: AxiosRequestConfig) => {
        NProgress.done();
        const user = JSON.parse(window.localStorage.getItem("userInfo"));
        console.log(user.userInfo.expires_time, new Date().getTime() / 1000);
        if (
          config.url !== "/api/auth/login" &&
          user.userInfo.expires_time < new Date().getTime() / 1000
        ) {
          if (!isRefresh) {
            isRefresh = true;
            const { data } = await this._refreshToken();
            user.userInfo.access_token = data.access_token;
            user.userInfo.refresh_token = data.refresh_token;
            user.userInfo.expires_time =
              data.expires_time + new Date().getTime() / 1000;
            window.localStorage.setItem("userInfo", JSON.stringify(user));
            promiseArr.forEach((cb) => {
              cb();
            });
            isRefresh = false;
            promiseArr = [];
          }
          return new Promise((resolve) => {
            promiseArr.push(
              resolve(new RequestHttp(allConfig).request(config))
            );
          });
        }

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
        } // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.statusCode && data.statusCode !== RequestEnums.SUCCESS) {
          NProgress.done();
          ElMessage.error(data.message); // 此处也可以使用组件提示报错信息
          return Promise.reject(data);
        }
        return data;
      },
      async (error: AxiosError) => {
        this.handleCode(error.response.data);
        if (error.response && error.response.status === 401) {
        } else {
          return Promise.reject(error);
        }
      }
    );
  }
  handleCode(err) {
    switch (err.statusCode) {
      case 401:
        NProgress.done();
        break;
      default:
        NProgress.done();
        ElMessage.error(err.message);
        break;
    }
  }
  _refreshToken() {
    const user = JSON.parse(window.localStorage.getItem("userInfo"));
    const userConf = {
      url: "/api/auth/refreshToken",
      method: "POST",
      data: {
        user_name: user.userInfo.user_name,
        user_id: user.userInfo.user_id,
      },
    };
    window.localStorage.setItem("userInfo", JSON.stringify(user));
    return new RequestHttp(allConfig).request<any>(userConf);
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
  request<T>(config: object): Promise<ResultData<T>> {
    NProgress.start();
    return this.service.request(config);
  }
}

// 导出一个实例对象
export default new RequestHttp(allConfig);
