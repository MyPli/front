import { getAccessToken } from "@/store/authStore";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "http://localhost:3000";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? BASE_URL // 개발 환경에서는 BASE_URL 사용
        : "http://localhost:3000",
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "content-type": "application/json",
      Authorization: getAccessToken() ? getAccessToken() : "",
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
    },
  );

  return axiosInstance;
};

export const httpClient = createClient();
type RequestMethod = "get" | "post" | "patch" | "delete";
export const requestHandler = async <T, R = any>(
  method: RequestMethod,
  url: string,
  payload?: T,
): Promise<R> => {
  let response: AxiosResponse<R>;
  if (method === "get" || method === "delete") {
    response = await httpClient[method]<R>(url);
  } else {
    response = await httpClient[method]<R>(url, payload);
  }
  return response.data;
};
