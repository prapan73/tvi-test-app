import React, { FormEvent } from "react";
import useHandle from "../hooks/useHandle";

const Header = () => {
  const [keyword, setKeyword] = React.useState("");
  const { onSearch } = useHandle();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <header className="fixed top-0 z-10 w-full py-2 bg-white shadow">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="flex justify-between lg:w-9/12">
            <div className="flex flex-wrap items-center w-full text-2xl font-bold text-gray-500">
              <div className="flex items-center w-full lg:w-2/3">
                <img
                  src="/covid19_response_icon.svg"
                  className="w-12 mr-4"
                  alt=""
                />
                Covid 19 News
              </div>
            </div>
            <div className="w-1/3 ">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  className="w-full px-3 py-2 mt-1 border border-gray-400 rounded-lg focus:outline-none"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-1">
                  <i className="text-2xl icon-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
