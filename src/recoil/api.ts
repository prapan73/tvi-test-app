import { atom } from "recoil";
import { ApiParams } from "../types/api";
export const defaultParams: ApiParams = {
  q: "covid",
  lang: "th",
  page: "1",
  page_size: "10",
  media: "True",
  sort_by: "relevancy",
};
export const apiAtom = atom({
  key: "apiAtom",
  default: defaultParams as ApiParams,
});
