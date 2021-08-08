import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto">
        <div className="flex justify-center px-4 lg:px-0">
          <div className="lg:w-9/12">
            <div className="flex flex-wrap mt-16 -mx-2 lg:mt-5">
              <div className="w-full lg:fixed lg:w-60 lg:block top-20">
                <Sidebar />
              </div>
              <div className="relative w-full px-2 mt-16 lg:left-64 lg:w-3/4">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
