/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRecoilState } from "recoil";
import { api, Response } from "./api";
import Card from "./components/Card";
import Layout from "./components/Layout";
import Modal from "./components/Modal";
import { apiAtom } from "./recoil/api";
import { modalAtom } from "./recoil/modal";
import { newsAtom } from "./recoil/news";
import { ApiParams } from "./types/api";
import { Article } from "./types/article";

let renderState = true;

const App: React.FC = () => {
  const [state, setState] = useRecoilState(newsAtom);
  const [apiState, setApiState] = useRecoilState(apiAtom);
  const [modalState] = useRecoilState(modalAtom);

  const [isScroll, setIsScroll] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [scrollLoading, setScrollLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!isScroll) {
      setIsScroll(true);
    }

    setError("");
    if (apiState.page === "1") setLoading(true);

    api(apiState)
      .then((res) => {
        const data: Response = res.data;

        let newsFeeds: Article[] = [];

        data.status === "ok" &&
          data.articles.forEach((o, i) => {
            newsFeeds[i] = {
              summary: o.summary,
              author: o.author,
              link: o.link,
              media: o.media,
              title: o.title,
              media_content: o.media_content,
              rights: o.rights,
              isLike: false,
              comments: [],
              lastUpdatedAt: null,
            };
          });
        if (apiState.page !== "1") {
          setState([...state, ...newsFeeds]);
        } else {
          setState(newsFeeds);
        }
        setLoading(false);
        renderState = true;
      })
      .catch((error) => {
        setLoading(false);
        setScrollLoading(false);
        setError(error.response.data.message);
      });

    if (isScroll) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [apiState]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;

    if (renderState) {
      const params: ApiParams = { ...apiState };
      params.page = (+apiState.page + 1).toString();
      setScrollLoading(true);
      setTimeout(() => setApiState(params), 1000);
      renderState = false;
    }
  };

  return (
    <div className="App">
      <Layout>
        <>
          {loading ? (
            <div className="text-center bg-white border border-gray-200 ">
              <div className="flex flex-wrap animate-pulse">
                <div className="w-full h-4 m-4 bg-gray-200"></div>
                <div className="w-full bg-gray-200 h-80"></div>
                <div className="w-full h-4 m-4 bg-gray-200"></div>
              </div>
            </div>
          ) : (
            <>
              {state.map((o, i) => (
                <Card id={i} data={o} key={i} />
              ))}

              {scrollLoading && (
                <div className="p-4 text-center bg-white border border-gray-200">
                  Loading
                </div>
              )}

              {error && (
                <div className="p-10 bg-white border border-gray-200">
                  <div className="p-4 bg-red-300 border border-red-400 rounded">
                    <h3 className="mb-3 font-bold">Error</h3>
                    <p>{error}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      </Layout>

      {modalState.isOpen && <Modal />}
    </div>
  );
};

export default App;
