import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Typography,
  InputNumber,
  notification,
} from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import { StorageController } from "../api/controllers/StorageController";

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddPackageDetals = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const location = useLocation();

  const {
    userData,
    currentValues,
    parentCallback,
    onCreatePackage,
    createBoxStatus,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [storerooms, setStorerooms] = useState([]);
  const [racks, setRacks] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(
    currentValues?.warehouse
  );
  const [selectedStoreroom, setSelectedStoreroom] = useState(
    currentValues?.storeRoom
  );
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    setQrCode(location?.state?.qrCode || currentValues.qrCode);
    parentCallback({
      qrCode: location?.state?.qrCode || currentValues.qrCode,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.state?.qrCode]);

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
      setSelectedStoreroom(value?.storeRoom);
      handleSelectStoreroom(value?.storeRoom);
    }
  };

  const onFinish = async (values) => {
    if (userData) {
      const payload = {
        ...values,
        qrCode,
        user_id: userData?.userId,
      };
      // setLoading(true);
      parentCallback(payload);
      if (currentValues?.items?.length > 0) {
        setTimeout(() => {
          onCreatePackage();
        }, 500);
      } else {
        alert("Warning: " + "No items are added in the box!");
      }
    }
  };

  const onReset = () => {
    form.resetFields();
    setLoading(false);
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
        initialValues={{}}
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
            {storerooms.map((storeroom) => {
              return (
                <Select.Option key={storeroom?.id} value={storeroom.id}>
                  {storeroom?.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            style={{ backgroundColor: "#1777ff", marginLeft: 10 }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Attach QrCode
          </Button>
          <Button
            style={{ backgroundColor: "#1777ff", marginLeft: 10 }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Save
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#1777ff", marginLeft: 10 }}
            htmlType="button"
            onClick={onReset}
          >
            Reset
          </Button>
          <Link to={"/dashboard"}>
            <Button
              type="primary"
              style={{ backgroundColor: "#f44336", marginLeft: 10 }}
              htmlType="button"
            >
              Cancel
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddPackageDetals;
