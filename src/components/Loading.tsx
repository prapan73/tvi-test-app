import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white">
      <div className="px-10 py-2 text-lg font-bold border border-gray-400 rounded shadow">
        Loading
      </div>
    </div>
  );
};

export default Loading;
