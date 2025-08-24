import axios, { AxiosError, AxiosRequestConfig } from "axios";

import Constants from "expo-constants";

const { apiUrl, apiKey, apiHost } = Constants.expoConfig?.extra || {};

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": apiHost,
  },
});

export const apiService = async <R>(props: AxiosRequestConfig) => {
  const { url, method = "GET", data, headers, params } = props;

  try {
    const res = await apiClient<R>({
      data,
      headers,
      method,
      url,
      params,
    });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw err.response?.data;
    }
    throw err;
  }
};
