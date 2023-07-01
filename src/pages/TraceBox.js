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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
  const [searchResponse, setSearchResponse] = useState([]);

  const onSearch = (e) => {
    if (e.target.value !== "" && e.target.value !== undefined) {
      BoxController.searchBox(e.target.value, userData.userId)
        .then((res) => {
          setSearchResponse(res.boxes);
        })
        .catch((e) => {
          alert(`FAIL`, e);
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
        {searchResponse?.map((box) => (
          <Card key={box.boxId} box={box} gotoBoxDetails={gotoBoxDetails} />
        ))}
      </Space>
    </>
  );
};

export default TraceBox;
