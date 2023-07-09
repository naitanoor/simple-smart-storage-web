import React, { useContext, useState } from "react";
import { Typography, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import { BoxController } from "../api/controllers/BoxController";

const { Search } = Input;
const { Title } = Typography;

const Card = ({ box, gotoBoxDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">{box.boxName}</h2>
      <p className="text-gray-600">Box Number: {box.boxNumber}</p>
      <p className="text-gray-600">Warehouse: {box?.warehouse?.name}</p>
      <p className="text-gray-600">Storeroom: {box?.storeRoom?.name}</p>
      <p className="text-gray-600">Rack Number: {box?.rack?.number}</p>
      <p className="text-gray-600">Rack Name: {box?.rack?.name}</p>
      <div className="mt-4">
        <button
          style={{ backgroundColor: "#2C847B" }}
          className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => gotoBoxDetails(box)}
        >
          VIEW DETAILS
        </button>
      </div>
    </div>
  );
};

const TraceBox = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchResponse, setSearchResponse] = useState([]);

  const onSearch = (e) => {
    setError("");
    if (e.target.value !== "" && e.target.value !== undefined) {
      setLoading(true);
      BoxController.searchBox(e.target.value, userData.userId)
        .then((res) => {
          setSearchResponse(res.boxes);
          setLoading(false);
        })
        .catch((e) => {
          setError(e?.message || "Something went wrong!");
          setLoading(false);
        });
    } else {
      setSearchResponse([]);
    }
  };

  const gotoBoxDetails = (boxData) => {
    navigate("/box-details", { state: { boxData } });
  };

  return (
    <>
      <Title level={3} style={{ textAlign: "center" }}>
        Search Box
      </Title>
      <Space style={{ width: "100%" }} direction="vertical" size="middle">
        <Space.Compact style={{ width: "100%" }}>
          <Search
            placeholder="Search..."
            allowClear
            onChange={onSearch}
            style={{ width: "100%" }}
          />
        </Space.Compact>
        {loading && (
          <div className="flex items-center justify-center mb-4">
            <div
              style={{ borderColor: "#2C847B" }}
              className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
            ></div>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {searchResponse?.map((box) => (
          <Card key={box.boxId} box={box} gotoBoxDetails={gotoBoxDetails} />
        ))}
      </Space>
    </>
  );
};

export default TraceBox;
