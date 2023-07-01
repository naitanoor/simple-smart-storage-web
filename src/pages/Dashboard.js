import React, { useContext, useEffect } from "react";
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
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
    navigate("/find");
  };

  return (
    <div class="grid grid-cols-1 gap-6 mb-4">
      <div class="flex items-center justify-center">
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex flex-col items-center pb-10">
            <h2
              className="text-xl font-bold mb-2 mt-4"
              style={{ textAlign: "center" }}
            >
              Boxes Created: {userBoxes?.length}
            </h2>
            <HomeIcon className="w-24 h-24 mb-6" />
            <button
              onClick={onAddWareHouse}
              class="text-white ml-10 mr-10 mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ADD WAREHOUSE
            </button>
            <button
              onClick={onAddStoreroom}
              class="text-white mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ADD STOREROOM
            </button>
            <button
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
          <div class="flex flex-col items-center pb-10">
            <CalendarIcon className="w-24 h-24 mb-6" />
            <button
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
          <div class="flex flex-col items-center pb-10">
            <UserGroupIcon className="w-24 h-24 mb-6" />
            <button
              onClick={onTraceBox}
              class="text-white mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              TRACE BOX
            </button>
            <button
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
