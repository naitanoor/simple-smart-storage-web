import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

function ScanQr() {
  const { userBoxes, currentValues } = useContext(AppContext);

  const navigate = useNavigate();

  const onAddPackageDetails = () => {
    navigate("/add-package-details");
  };
  const onAddItems = () => {
    navigate("/add-package-item");
  };

  return (
    <div class="grid grid-cols-1 gap-6 mb-14 mt-20">
      <div class="flex items-center justify-center">
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h2
            className="text-2xl font-bold mb-2 mt-4"
            style={{ textAlign: "center" }}
          >
            Box No: {userBoxes?.length + 1}
          </h2>
          <div class="w-full flex items-center p-10">
            <button
              onClick={onAddPackageDetails}
              class="text-white ml-10 mr-10 mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ADD DETAILS
            </button>
            <button
              onClick={onAddItems}
              class="text-white mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ADD ITEMS
            </button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <div class="w-full max-w-sm bg-white border p-10 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex flex-col items-center"></div>
        </div>
      </div>
    </div>
  );
}

export default ScanQr;
