import { atom } from "recoil";
import { Article } from "../types/article";

export const newsAtom = atom({
  key: "newsAtom",
  default: [] as Article[],
});
