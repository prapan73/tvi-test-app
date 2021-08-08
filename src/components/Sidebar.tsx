import classNames from "classnames";
import React from "react";
import { useRecoilState } from "recoil";
import useHandle from "../hooks/useHandle";
import { apiAtom } from "../recoil/api";
import { Lang, SortBy } from "../types/api";

const countries: Lang[] = ["th", "en", "es", "fa"];
const sortBy: SortBy[] = ["relevancy", "date", "rank"];

const Sidebar: React.FC = () => {
  const [apiState] = useRecoilState(apiAtom);
  const { onSelectCountry, onSelectSortBy } = useHandle();
  return (
    <div>
      <div>
        <h2 className="font-bold text-gray-400">Country:</h2>
        <div className="flex flex-wrap mt-2 -mx-1">
          {countries.map((o, i) => (
            <div className="w-1/3 px-1" key={i}>
              <button
                className={classNames(
                  "w-full py-1  border border-yellow-500 rounded uppercase mb-2",
                  apiState.lang === o
                    ? "bg-yellow-500 text-white"
                    : "text-yellow-500"
                )}
                onClick={() => onSelectCountry(o)}
              >
                {o}
              </button>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-gray-400">Sort by:</h2>
        <div className="flex flex-wrap mt-2 -mx-1">
          {sortBy.map((o, i) => (
            <div className="px-1 " key={i}>
              <button
                className={classNames(
                  "w-full py-1 px-3 border border-blue-900 rounded uppercase mb-2",
                  apiState.sort_by === o
                    ? "bg-blue-900 text-white"
                    : "text-blue-900"
                )}
                onClick={() => onSelectSortBy(o)}
              >
                {o}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
