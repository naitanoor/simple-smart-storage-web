import React, { useContext, useEffect } from "react";
import {
  CalendarIcon,
  HomeModernIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

function Dashboard() {
  const navigate = useNavigate();
  const { userData, userBoxes, getUserBoxes } = useContext(AppContext);

  useEffect(() => {
    getUserBoxes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, navigate]);

  const onAddWareHouse = () => {
    navigate("/add-warehouse");
  };
  const onAddStoreroom = () => {
    navigate("/add-storeroom");
  };
  const onAddRack = () => {
    navigate("/add-rack");
  };
  const onPack = () => {
    navigate("/create-box");
  };
  const onTraceBox = () => {
    navigate("/search-box");
  };
  const onFindWhatInsideBox = () => {
    navigate("/scan-qr");
  };

  return (
    <div class="grid grid-cols-1 gap-6 mb-4">
      <div class="flex items-center justify-center">
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex flex-col items-center pt-6 pb-10">
            <HomeModernIcon className="w-24 h-24 mb-6" />
            <button
              style={{ width: "200px", backgroundColor: "#2C847B" }}
              onClick={onAddWareHouse}
              class="text-white ml-10 mr-10 mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ADD WAREHOUSE
            </button>
            <button
              style={{ width: "200px", backgroundColor: "#2C847B" }}
              onClick={onAddStoreroom}
              class="text-white mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ADD STOREROOM
            </button>
            <button
              style={{ width: "200px", backgroundColor: "#2C847B" }}
              onClick={onAddRack}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ADD RACK
            </button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex flex-col items-center pt-6 pt-6 pb-10">
            <h2
              className="text-xl border border-gray-200 p-4 rounded-lg font-bold mb-4 mt-4"
              style={{ textAlign: "center" }}
            >
              BOXES CREATED: {userBoxes?.length}
            </h2>
            <CalendarIcon className="w-24 h-24 mb-6" />
            <button
              style={{ width: "200px", backgroundColor: "#2C847B" }}
              onClick={onPack}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              PACK
            </button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex flex-col items-center pt-6 pb-10">
            <MagnifyingGlassIcon className="w-24 h-24 mb-6" />
            <button
              style={{ width: "200px", backgroundColor: "#2C847B" }}
              onClick={onTraceBox}
              class="text-white mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              TRACE BOX
            </button>
            <button
              style={{ width: "200px", backgroundColor: "#2C847B" }}
              onClick={onFindWhatInsideBox}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              FIND WHAT'S INSIDE THE BOX
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
