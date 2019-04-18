import Axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosPromise,
  AxiosInterceptorManager,
  AxiosResponse,
  CancelTokenSource
} from 'axios';
import { formatRequestQuery } from './formatRequestQuery';

export class HttpClient {
  static defualtConfig: AxiosRequestConfig;

  _config?: AxiosRequestConfig;
  _axios: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    // initalize config if does not supply
    this.cancelTokenSource = Axios.CancelToken.source();

    const tokenConfig = { cancelToken: this.cancelTokenSource.token, ...HttpClient.defualtConfig };
    const axiosConfig = config ? { ...config, ...tokenConfig } : tokenConfig;

    this._config = axiosConfig;
    this._axios = Axios.create(this._config);

    this.interceptors = {
      request: this._axios.interceptors.request,
      response: this._axios.interceptors.response
    };
  }

  cancelTokenSource: CancelTokenSource;

  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<any>>;
  };

  delete<TResponse = any>(url: string, config?: AxiosRequestConfig) {
    return this._axios.delete(url, config) as AxiosPromise<TResponse>;
  }

  head<TResponse = any>(url: string, config?: AxiosRequestConfig) {
    return this._axios.head(url, config) as AxiosPromise<TResponse>;
  }

  request<TResponse = any>(config: AxiosRequestConfig) {
    return this._axios.request<TResponse>(config);
  }

  get<TRequest = any, TResponse = any>(url: string, data?: TRequest, config?: AxiosRequestConfig) {
    if (data) return this._axios.get<TResponse>(`${url}?${formatRequestQuery(data)}`, config);
    return this._axios.get<TResponse>(url, config);
  }

  post<TRequest = any, TResponse = any>(url: string, data?: TRequest, config?: AxiosRequestConfig) {
    return this._axios.post<TResponse>(url, data, config);
  }

  put<TRequest = any, TResponse = any>(url: string, data?: TRequest, config?: AxiosRequestConfig) {
    return this._axios.put<TResponse>(url, data, config);
  }

  patch<TRequest = any, TResponse = any>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ) {
    return this._axios.patch<TResponse>(url, data, config);
  }
}
