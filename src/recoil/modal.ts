import { atom } from "recoil";
import { Modal } from "../types/modal";

export const modalAtom = atom({
  key: "modalAtom",
  default: {
    isOpen: false,
  } as Modal,
});
