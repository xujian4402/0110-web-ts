import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

export type DaoRequestInstance = Partial<AxiosInstance> & {
  getSempre(url: string, config?: AxiosRequestConfig): AxiosPromise;
};

export const globalAxiosMap: any = new Object();

export function stringifyRequest(url: string, config: AxiosRequestConfig = {}) {
  return JSON.stringify({
    url: url.indexOf('/') === 0 ? url.substr(1) : url,
    ...config,
    commonHeaders: axios.defaults.headers.common
  });
}

export default class DaoRequest implements DaoRequestInstance {
  constructor(private _cancelToken?: any) {}

  public get(url: string, config: AxiosRequestConfig = {}) {
    const path = stringifyRequest(url, config);
    const cache = globalAxiosMap[path];
    if (cache) {
      return cache;
    }

    globalAxiosMap[path] = axios.get(url, {
      ...config,
      cancelToken: this._cancelToken
    });

    return globalAxiosMap[path];
  }

  public getSempre(url: string, config: AxiosRequestConfig = {}) {
    const path = stringifyRequest(url, config);
    const cache = globalAxiosMap[path];
    if (cache) {
      return cache;
    }

    globalAxiosMap[path] = axios.get(url, config);

    return globalAxiosMap[path];
  }

  public delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config: AxiosRequestConfig = {}
  ) {
    return axios.delete<T, R>(url, config);
  }

  public head<T = any, R = AxiosResponse<T>>(
    url: string,
    config: AxiosRequestConfig = {}
  ) {
    return axios.head<T, R>(url, config);
  }

  public post<T = any, R = AxiosResponse<T>>(
    url: string,
    data = {},
    config: AxiosRequestConfig = {}
  ) {
    return axios.post<T, R>(url, data, config);
  }

  public put<T = any, R = AxiosResponse<T>>(
    url: string,
    data = {},
    config: AxiosRequestConfig = {}
  ) {
    return axios.put<T, R>(url, data, config);
  }

  public patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data = {},
    config: AxiosRequestConfig = {}
  ) {
    return axios.patch<T, R>(url, data, config);
  }
}
