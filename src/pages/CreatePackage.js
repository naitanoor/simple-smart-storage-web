import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

const ItemCard = ({ imageSource, title, keywords }) => {
  return (
    <div className="flex border-2 mb-4 p-4 rounded-lg flex-col items-center">
      {imageSource ? (
        <img
          className="w-full h-auto mb-4 rounded-lg"
          src={imageSource}
          alt="Item-Pic"
        />
      ) : (
        <div className="w-full h-auto flex items-center justify-center mb-4">
          <span className="text-xl text-red-500">No image found</span>
        </div>
      )}
      <div className="flex flex-col items-center">
        <h2 className="text-l font-bold mb-2">{title}</h2>
        <div className="flex">
          <div className="flex overflow-x-auto">
            {keywords.map((keyword, index) => (
              <div
                key={index}
                className="px-2 py-1 bg-gray-500 text-white rounded mr-2"
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function CreatePackage() {
  const navigate = useNavigate();
  const { userBoxes, currentValues, onCreatePackage } = useContext(AppContext);

  const onAddPackageDetails = () => {
    navigate("/add-package-details");
  };
  const onAddItems = () => {
    navigate("/add-package-item");
  };

  const onSaveBox = () => {
    if (
      currentValues?.boxName !== "" &&
      currentValues?.warehouse !== "" &&
      currentValues?.storeRoom !== "" &&
      currentValues?.rackNumber !== "" &&
      currentValues?.qrCode !== "" &&
      currentValues?.qrCode !== undefined &&
      currentValues?.items?.length > 0
    ) {
      onCreatePackage();
    } else {
      alert("Please add box details and add at least one item to the box.");
    }
  };

  return (
    <div class="grid grid-cols-1 gap-6 mb-14 mt-20">
      <div
        class="flex items-center justify-center"
        style={{ flexDirection: "column" }}
      >
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h2
            className="text-2xl font-bold mb-8 mt-8"
            style={{ textAlign: "center" }}
          >
            BOX NO: {userBoxes?.length + 1}
          </h2>
          <div class="grid grid-cols-1 gap-2 mb-0 mt-0">
            <button
              style={{ backgroundColor: "#2C847B" }}
              onClick={onAddPackageDetails}
              class="text-white ml-10 mr-10 mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ADD DETAILS
            </button>
            <button
              style={{ backgroundColor: "#2C847B" }}
              onClick={onAddItems}
              class="text-white mb-4 ml-10 mr-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ADD ITEMS
            </button>
          </div>
        </div>
        <div class="w-full max-w-sm flex items-center justify-center mt-10">
          <div class="w-full max-w-sm bg-white border p-10 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col items-center">
              {currentValues?.items?.length > 0 && (
                <h2 className="text-l font-bold mb-2">BOX ITEMS</h2>
              )}
              <div style={{ marginTop: 20 }}>
                {currentValues?.items?.length > 0 ? (
                  currentValues?.items?.map((item) => {
                    return (
                      <div key={item?.itemId}>
                        <ItemCard
                          imageSource={item?.itemImage}
                          title={item?.name}
                          keywords={item?.keywords}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full h-auto flex items-center justify-center mb-4">
                    <span className="text-xl text-red-500">NO ITEMS ADDED</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div class="w-full max-w-sm flex items-center justify-center mt-10"></div>
        <button
          style={{ width: "280px", backgroundColor: "#2C847B" }}
          onClick={onSaveBox}
          class="rounded-full text-white max-w-sm ml-10 mr-10 mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          SAVE
        </button>
      </div>
    </div>
  );
}

export default CreatePackage;
