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

const AddRack = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const { userData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [storerooms, setStorerooms] = useState([]);

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

  const handleSelectWarehouse = (warehouseId) => {
    fetchStorerooms(warehouseId);
  };

  const onFormLayoutChange = (value) => {
    if (value?.hasOwnProperty("warehouse_id")) {
      handleSelectWarehouse(value?.warehouse_id);
    }
  };
  const onFinish = async (values) => {
    if (userData) {
      const payload = {
        user_id: userData?.userId,
        ...values,
      };
      setLoading(true);
      try {
        const res = await StorageController.addRack(payload);
        if (res?.success) {
          setLoading(false);
          api.success({
            message: "Success",
            description: res?.message,
            placement: "topRight",
          });
          setTimeout(() => {
            onReset();
          }, 1000);
        }
      } catch (e) {
        setLoading(false);
        api.error({
          message: "Fail",
          description: e?.message || "Something went wrong!",
          placement: "topRight",
        });
      }
    } else {
      api.error({
        message: "Fail",
        description: "User info not found, try login again",
        placement: "topRight",
      });
    }
  };

  const onReset = () => {
    form.resetFields();
    setLoading(false);
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        initialValues={{}}
        onValuesChange={onFormLayoutChange}
      >
        {contextHolder}
        <Form.Item>
          <Title level={3}>Add Rack</Title>
        </Form.Item>
        <Form.Item
          name="warehouse_id"
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
          name="storeroom_id"
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
          name="rack_name"
          label="Rack Name"
          rules={[{ required: true, message: "rack name is required" }]}
        >
          <Input placeholder="Enter rack name" />
        </Form.Item>
        <Form.Item
          name="rack_number"
          label="Rack Number"
          rules={[{ required: true, message: "rack number is required" }]}
        >
          <InputNumber
            placeholder="Enter rack number"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="capacity"
          label="Rack Capacity"
          rules={[{ required: true, message: "rack capacity is required" }]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
            placeholder="Enter rack capacity"
          />
        </Form.Item>
        <Form.Item
          name="rack_type"
          label="Rack type"
          rules={[{ required: true, message: "rack type is required" }]}
        >
          <Input placeholder="Enter rack type" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            style={{ backgroundColor: "#1777ff", marginLeft: 10 }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Submit
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

export default AddRack;
