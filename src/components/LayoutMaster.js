// LayoutMaster.js

import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { AppContext } from "../context/AppContext";

const LayoutMaster = ({ children }) => {
  const { isSignedIn } = useContext(AppContext);

  if (isSignedIn) {
    return (
      <>
        <Sidebar />
        <div className="p-4 mt-20 sm:ml-64">
          <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            {children}
          </div>
        </div>
      </>
    );
  }
  return children;
};

export default LayoutMaster;
