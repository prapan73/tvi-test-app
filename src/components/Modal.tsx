import React from "react";
import { useRecoilState } from "recoil";
import useHandle from "../hooks/useHandle";
import { modalAtom } from "../recoil/modal";
import { newsAtom } from "../recoil/news";

const Modal = () => {
  const { onOpenModal, onPrev, onNext } = useHandle();
  const [state] = useRecoilState(newsAtom);
  const [modalState] = useRecoilState(modalAtom);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-white">
      {modalState.key !== undefined && (
        <div className="mx-auto">
          <div className="flex justify-center h-screen">
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="relative w-full h-screen overflow-hidden bg-black lg:w-9/12">
                  <button
                    onClick={() => onOpenModal(false)}
                    className="absolute z-20 px-3 py-1 text-red-500 border border-red-500 rounded left-5 top-5"
                  >
                    Close
                  </button>
                  <img
                    src={state[modalState.key].media}
                    alt={state[modalState.key].title}
                    className="absolute max-h-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  />
                  {modalState.key > 0 && (
                    <button
                      onClick={() => onPrev(modalState.key ?? 0)}
                      className="absolute left-0 text-sm text-white transform -translate-y-1/2 rounded-r top-1/2"
                    >
                      <i className="text-6xl icon-keyboard_arrow_left"></i>
                    </button>
                  )}
                  {modalState.key < state.length - 1 && (
                    <button
                      onClick={() => onNext(modalState.key ?? 0)}
                      className="absolute right-0 text-sm text-white transform -translate-y-1/2 rounded-l top-1/2"
                    >
                      <i className="text-6xl icon-keyboard_arrow_right"></i>
                    </button>
                  )}
                </div>
                <div className="w-full h-screen lg:w-3/12">
                  <div className="h-screen p-5 overflow-y-auto">
                    <h2 className="mb-4 text-lg font-bold">
                      {state[modalState.key].title}
                    </h2>
                    <p>{state[modalState.key].summary}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
