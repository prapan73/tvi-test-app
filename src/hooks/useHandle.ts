/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRecoilState } from "recoil";
import { apiAtom } from "../recoil/api";
import { modalAtom } from "../recoil/modal";
import { newsAtom } from "../recoil/news";
import { Lang, SortBy } from "../types/api";
import { Comment } from "../types/article";
import { randomNames } from "../utils/names";

const useHandle = () => {
  const [state, setState] = useRecoilState(newsAtom);
  const [apiState, setApiState] = useRecoilState(apiAtom);
  const [modalState, setModalState] = useRecoilState(modalAtom);
  const [loading] = React.useState(false);
  const [error] = React.useState<string | undefined>(undefined);

  const onLike = React.useCallback(
    (index: number, isLike: boolean): void => {
      const data = [...state];
      data[index] = { ...data[index], isLike };
      setState(data);
    },
    [state]
  );

  const onComment = React.useCallback(
    (index: number, message: string): void => {
      const data = [...state];

      data[index] = { ...data[index], lastUpdatedAt: new Date() };
      const comments = [...(data[index].comments as Comment[])];
      comments.push({
        name: randomNames(),
        message,
        isLike: false,
      });

      data[index] = { ...data[index], comments };

      setState(data);
    },
    [state]
  );

  const onLikeComment = React.useCallback(
    (index: number, commentIndex: number, isLike) => {
      const data = [...state];

      const comments = [...(data[index].comments as Comment[])];
      comments[commentIndex] = { ...comments[commentIndex], isLike };

      data[index] = { ...data[index], comments };

      setState(data);
    },
    [state]
  );

  const onSelectCountry = React.useCallback(
    (lang: string): void => {
      window.scrollTo(0, 0);
      setApiState({ ...apiState, lang: lang as Lang, page: "1" });
    },
    [apiState]
  );

  const onSelectSortBy = React.useCallback(
    (sortBy: string): void => {
      window.scrollTo(0, 0);
      setApiState({ ...apiState, sort_by: sortBy as SortBy, page: "1" });
    },
    [apiState]
  );

  const onOpenModal = React.useCallback(
    (isOpen: boolean, key: number | undefined = undefined) => {
      setModalState({ isOpen, key });
    },
    [modalState]
  );

  const onPrev = React.useCallback(
    (key: number) => {
      setModalState({ isOpen: true, key: key - 1 });
    },
    [modalState]
  );

  const onNext = React.useCallback(
    (key: number) => {
      setModalState({ isOpen: true, key: key + 1 });
    },
    [modalState]
  );

  const onSearch = React.useCallback(
    (keyword: string) => {
      const results = state.filter((o) => o.title.includes(keyword));
      setState(results);
      window.scrollTo(0, 0);
    },
    [state]
  );

  return {
    loading,
    state,
    error,
    onLike,
    onComment,
    onLikeComment,
    onSelectCountry,
    onSelectSortBy,
    onOpenModal,
    onPrev,
    onNext,
    onSearch,
  };
};

export default useHandle;
