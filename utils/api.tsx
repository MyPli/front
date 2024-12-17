/* eslint-disable @typescript-eslint/no-explicit-any */
type METHOD = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface APIOptions {
  headers?: Record<string, string>;
  body?: BodyInit;
  [key: string]: any;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const createAPI = async (
  endpoint: string,
  method: METHOD,
  options: APIOptions = {},
) => {
  const { headers = {}, body, ...restOptions } = options;

  const res = await fetch(BASE_URL + endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body,
    ...restOptions,
	});
	
	if (!res.ok) {
    const error = new Error("API Error");
    throw error;
  }

  return res;
};

export const api = {
  get: (endpoint: string, options?: APIOptions) =>
    createAPI(endpoint, "GET", options),
  post: (endpoint: string, options?: APIOptions) =>
    createAPI(endpoint, "POST", options),
  patch: (endpoint: string, options?: APIOptions) =>
    createAPI(endpoint, "PATCH", options),
  put: (endpoint: string, options?: APIOptions) =>
    createAPI(endpoint, "PUT", options),
  delete: (endpoint: string, options?: APIOptions) =>
    createAPI(endpoint, "DELETE", options),
};