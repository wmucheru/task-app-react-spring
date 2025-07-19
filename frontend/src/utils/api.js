import axios from "axios";

import { API_URL } from "./constants";

import { Auth } from "./auth";

const axiosOptions = {
  baseURL: API_URL,
  timeout: 20000,
};

export const useAPI = async (options) => {
  const { type, url, params, data, headers, auth = true } = options;

  const hookOptions = {
    ...axiosOptions,
    headers: {
      ...headers,
    },
  };

  // Add auth header to hook options
  if (auth) {
    hookOptions.headers.authorization = `Bearer: ${await Auth.getUserToken()}`;
  }

  const hookAxios = axios.create(hookOptions);

  let request;

  switch (type) {
    case "POST":
      request = hookAxios.post(url, data);
      break;

    case "PUT":
      request = hookAxios.put(url, data);
      break;

    case "PATCH":
      request = hookAxios.patch(url, data);
      break;

    case "DELETE":
      request = hookAxios.delete(url);
      break;

    case "GET":
    default:
      request = hookAxios.get(url, {
        params,
      });
      break;
  }

  return request;
};

/**
 *
 * https://github.com/axios/axios
 *
 */
export const customAxios = axios.create(axiosOptions);

export const get = (url, params = {}) => {
  return customAxios.get(url, {
    params,
  });
};

export const post = (url, data = {}) => {
  return customAxios.post(url, data);
};

export const put = (url, data = {}) => {
  return customAxios.put(url, data);
};

export const remove = (url) => {
  return customAxios.delete(url);
};

export default customAxios;
