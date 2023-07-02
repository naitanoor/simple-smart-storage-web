import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Title } = Typography;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

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

const BoxDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const boxData = location?.state?.boxData;

  const [form] = Form.useForm();

  return (
    <div
      style={{
        display: "flex",
        // alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        BOX NO: {boxData?.boxNumber}
      </Title>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={null}
        style={{
          width: "100%",
        }}
        initialValues={{
          box_name: boxData.boxName,
          warehouse_name: boxData?.warehouse?.name,
          contact_person_name: boxData?.warehouse?.contactPerson,
          contact_person_phone: boxData?.warehouse?.contactPhone,
          store_room: boxData?.storeRoom?.name,
          store_person_name: boxData?.storeRoom?.contactPerson,
          store_person_phone: boxData?.storeRoom?.contactPhone,
          rack_number: boxData?.rack?.number?.toString(),
          rack_name: boxData?.rack?.name?.toString(),
        }}
      >
        <Form.Item name="box_name" label="Box Name">
          <Input placeholder="Enter rack name" />
        </Form.Item>
        <Form.Item name="warehouse_name" label="Warehouse">
          <Input />
        </Form.Item>
        <Form.Item name="contact_person_name" label="Warehouse Contact Person">
          <Input />
        </Form.Item>
        <Form.Item name="contact_person_phone" label="Warehouse Contact Phone">
          <Input />
        </Form.Item>
        <Form.Item name="store_room" label="Storeroom">
          <Input />
        </Form.Item>
        <Form.Item name="store_person_name" label="Storeroom Contact Name">
          <Input />
        </Form.Item>
        <Form.Item name="store_person_phone" label="Storeroom Contact Phone">
          <Input />
        </Form.Item>
        <Form.Item name="rack_number" label="Rack number">
          <Input />
        </Form.Item>
        <Form.Item name="rack_name" label="Rack name">
          <Input />
        </Form.Item>
        <Form.Item name="items" label="Item(s)">
          {boxData.items?.map((item) => {
            return (
              <div key={item?.itemId}>
                <ItemCard
                  imageSource={item?.itemImage}
                  title={item?.name}
                  keywords={item?.keywords}
                />
              </div>
            );
          })}
        </Form.Item>
      </Form>
      <Button
        onClick={() => navigate("/search-box")}
        type="primary"
        htmlType="button"
        style={{
          width: "50%",
          display: "flex",
          alignSelf: "center",
          backgroundColor: "#2C847B",
          justifyContent: "center",
        }}
      >
        Back
      </Button>
    </div>
  );
};

export default BoxDetails;
