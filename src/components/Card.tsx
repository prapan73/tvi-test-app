import React from "react";
import { Article } from "../types/article";
import useHandle from "../hooks/useHandle";
import classNames from "classnames";
import { formatDistanceToNow } from "date-fns";

type Props = {
  id: number;
  data: Article;
};

const Card: React.FC<Props> = ({ id, data }) => {
  const [toggleComment, setToggleComment] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  const inputRef = React.useRef<any>(null);

  const { onLike, onComment, onLikeComment, onOpenModal } = useHandle();

  React.useEffect(() => {
    if (toggleComment) {
      inputRef.current?.focus();
    }
  }, [toggleComment]);

  const handleToggleComment = () => {
    setToggleComment(!toggleComment);
  };

  const handlePostComment = (id: number): void => {
    if (message === "") return;

    onComment(id, message);
    inputRef.current.value = "";
    setMessage("");
  };

  return (
    <div className="mb-4 bg-white border border-gray-200">
      <h2 className="p-4 font-semibold">{data.rights}</h2>
      <button onClick={() => onOpenModal(true, id)} className="">
        {data.media ? (
          <img src={data.media} alt={data.title} className="max-w-full" />
        ) : (
          <img src="http://via.placeholder.com/800x460" alt="" />
        )}
      </button>

      <div className="p-4">
        <div className="flex items-center mb-2">
          <button className="mr-4" onClick={() => onLike(id, !data.isLike)}>
            <i
              className={classNames(
                "text-2xl",
                data.isLike ? "icon-heart text-red-500" : "icon-heart-o"
              )}
            ></i>
          </button>
          <button onClick={handleToggleComment} className="mr-4 -mt-1">
            <i className="text-2xl icon-comment-o"></i>
          </button>
        </div>
        <h3 className="mb-1 text-lg font-semibold">{data.title}</h3>
        <p>{data.summary}</p>
        {data.comments && (
          <div className="mt-4">
            {data.comments.map((comment, i) => (
              <div className="flex items-center justify-between" key={i}>
                <div className="text-sm">
                  <strong>{comment.name}</strong> : {comment.message}
                </div>
                <div>
                  <button
                    className="mr-4"
                    onClick={() => onLikeComment(id, i, !comment.isLike)}
                  >
                    <i
                      className={classNames(
                        comment.isLike
                          ? "icon-heart text-red-500"
                          : "icon-heart-o"
                      )}
                    ></i>
                  </button>
                </div>
              </div>
            ))}
            {data.lastUpdatedAt && (
              <div className="mt-3 text-gray-400 uppercase">
                {formatDistanceToNow(data.lastUpdatedAt)}
              </div>
            )}
          </div>
        )}
      </div>
      {toggleComment && (
        <div className="relative px-4 pt-4 pb-4 border-t border-gray-200">
          <input
            ref={inputRef}
            type="text"
            className="w-full px-2 py-1 outline-none"
            placeholder="Comment"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={() => handlePostComment(id)}
            className="absolute font-bold text-blue-700 top-4 right-5"
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
