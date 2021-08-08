import axios, { AxiosRequestConfig } from "axios";
import { ApiParams } from "../types/api";
import { Article } from "../types/article";

export type Response = {
  articles: Article[];
  page: number;
  page_size: number;
  status: "ok" | "error";
  total_hits: number;
  total_pages: number;
  errorMessage?: string;
};

export const source = axios.CancelToken.source();
export const timeout: number = 10000;

export const api = (params: ApiParams): Promise<any> => {
  const url = "https://covid-19-news.p.rapidapi.com/v1/covid";
  const options: AxiosRequestConfig = {
    params,
    headers: {
      "x-rapidapi-key": "799f745476msheb41ca6524776ccp15128fjsn6de3357dc10c",
      "x-rapidapi-host": "covid-19-news.p.rapidapi.com",
    },
    cancelToken: source.token,
    timeout: timeout,
  };

  return axios.get(url, options);
};
