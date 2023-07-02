import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Form,
  Input,
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

const AddWarehouse = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const { userData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      // Clean up any resources or subscriptions here
    };
  }, []);

  const onFinish = async (values) => {
    if (userData) {
      const payload = {
        userId: userData?.userId,
        ...values,
      };
      setLoading(true);
      try {
        const res = await StorageController.addWarehouse(payload);
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
      <Title level={3} style={{ textAlign: "center" }}>
        Add Warehouse
      </Title>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 1000 }}
        initialValues={{
          name: "",
          location: "",
          capacity: "",
          contact_person: "",
          contact_phone: "",
        }}
      >
        {contextHolder}
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Enter warehouse name" />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter warehouse location" />
        </Form.Item>
        <Form.Item
          name="capacity"
          label="Capacity"
          rules={[{ required: true }]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
            placeholder="Enter warehouse capacity"
          />
        </Form.Item>
        <Form.Item
          name="contact_person"
          label="Contact Person Name"
          rules={[
            { required: true, message: "contact person name is required" },
          ]}
        >
          <Input placeholder="Enter contact person name" />
        </Form.Item>
        <Form.Item
          name="contact_phone"
          label="Contact Person Phone"
          rules={[
            { required: true, message: "contact person phone is required" },
          ]}
        >
          <Input placeholder="Enter contact person phone" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            style={{ backgroundColor: "#2C847B", marginLeft: 0 }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Submit
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#2C847B", marginLeft: 10 }}
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

export default AddWarehouse;
