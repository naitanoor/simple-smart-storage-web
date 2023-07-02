import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Input, Select, Typography, notification } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

import { AppContext } from "../context/AppContext";
import { StorageController } from "../api/controllers/StorageController";

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const AddPackageDetals = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const { userData, currentValues, parentCallback, onCreatePackage } =
    useContext(AppContext);

  const [back] = useState("#FFFFFF");
  const [fore] = useState("#000000");
  const [size] = useState(256);

  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [storerooms, setStorerooms] = useState([]);
  const [racks, setRacks] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(
    currentValues?.warehouse
  );

  useEffect(() => {
    fetchWarehouses();
    return () => {
      // Clean up any resources or subscriptions here
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWarehouses = () => {
    StorageController.getUserWarehouses(userData?.userId)
      .then((res) => {
        if (res?.success) {
          setWarehouses(res?.data);
        }
      })
      .catch((e) => {
        alert("Error", e?.message ? e?.message : "Something went wrong");
      });
  };

  const fetchStorerooms = (warehouseId) => {
    StorageController.getUserStorerooms(warehouseId, userData?.userId)
      .then((res) => {
        if (res?.success) {
          setStorerooms(res?.data);
        }
      })
      .catch((e) => {
        alert("Error", e?.message ? e?.message : "Something went wrong");
      });
  };

  const fetchRacks = (storeroomId) => {
    StorageController.getRacks(userData?.userId, selectedWarehouse, storeroomId)
      .then((res) => {
        if (res?.success) {
          setRacks(res?.data);
        }
      })
      .catch((e) => {
        alert("Error", e?.message ? e?.message : "Something went wrong");
      });
  };

  const handleSelectWarehouse = (warehouseId) => {
    fetchStorerooms(warehouseId);
  };

  const handleSelectStoreroom = (storeroomId) => {
    fetchRacks(storeroomId);
  };

  const onFormLayoutChange = (value) => {
    if (value?.hasOwnProperty("warehouse")) {
      setSelectedWarehouse(value?.warehouse);
      handleSelectWarehouse(value?.warehouse);
    }
    if (value?.hasOwnProperty("storeRoom")) {
      // setSelectedStoreroom(value?.storeRoom);
      handleSelectStoreroom(value?.storeRoom);
    }
  };

  const onFinish = async (values) => {
    if (userData) {
      const payload = {
        ...values,
        qrCode: currentValues.qrCode,
        user_id: userData?.userId,
      };
      // setLoading(true);
      parentCallback(payload);
      if (currentValues?.items?.length > 0) {
        setTimeout(() => {
          // onCreatePackage();
          navigate("/add-package-details");
        }, 500);
      } else {
        alert("No items are added in the box!");
      }
    }
  };

  const onReset = () => {
    form.resetFields();
    setLoading(false);
  };

  const handleScanQrCode = () => {
    navigate("/scan-qr", { state: { isCreatingBox: true } });
  };

  return (
    <>
      <Title level={3} style={{ textAlign: "center" }}>
        Storage Details
      </Title>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 1000 }}
        initialValues={{
          ...currentValues,
        }}
        onValuesChange={onFormLayoutChange}
      >
        {contextHolder}
        <Form.Item
          name="boxName"
          label="Box Name"
          rules={[{ required: true, message: "Box name is required" }]}
        >
          <Input placeholder="Enter box name" />
        </Form.Item>
        <Form.Item
          name="warehouse"
          label="Select Warehouse"
          rules={[{ required: true, message: "Warehouse is required" }]}
        >
          <Select placeholder="Warehouse">
            {warehouses.map((warehouse) => {
              return (
                <Select.Option key={warehouse?.id} value={warehouse.id}>
                  {warehouse?.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="storeRoom"
          label="Select Storeroom"
          rules={[{ required: true, message: "Storeroom is required" }]}
        >
          <Select placeholder="Storeroom">
            {storerooms.map((storeroom) => {
              return (
                <Select.Option key={storeroom?.id} value={storeroom.id}>
                  {storeroom?.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="rackNumber"
          label="Select rack"
          rules={[{ required: true, message: "Rack is required" }]}
        >
          <Select placeholder="Rack">
            {racks.map((rack) => {
              return (
                <Select.Option key={rack?.rack_id} value={rack.rack_id}>
                  {rack?.rack_name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        {currentValues?.qrCode && (
          <Form.Item
            name="qrCode"
            label="QrCode"
            rules={[{ required: true, message: "QrCode is required" }]}
          >
            <QRCode
              title="SSS"
              value={currentValues?.qrCode}
              bgColor={back}
              fgColor={fore}
              size={size === "" ? 0 : size}
            />
          </Form.Item>
        )}
        <Form.Item {...tailLayout}>
          <Button
            onClick={handleScanQrCode}
            style={{ backgroundColor: "#2C847B", marginLeft: 10 }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            {currentValues?.qrCode ? "Update QrCode" : "Attach QrCode"}
          </Button>
          <Link to={"/add-package-item"}>
            <Button
              type="primary"
              style={{ backgroundColor: "#2C847B", marginLeft: 10 }}
              htmlType="button"
              onClick={onReset}
            >
              Add Items
            </Button>
          </Link>
          <Button
            style={{ backgroundColor: "#2C847B", marginLeft: 10 }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Save
          </Button>
          {/* <Link to={"/dashboard"}>
            <Button
              type="primary"
              style={{ backgroundColor: "#f44336", marginLeft: 10 }}
              htmlType="button"
            >
              Cancel
            </Button>
          </Link> */}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddPackageDetals;
