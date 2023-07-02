import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, Typography, notification } from "antd";

import { setData } from "../api/CommonFunctions";
import { AppContext } from "../context/AppContext";
import { UserController } from "../api/controllers/UserController";

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Profile = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const { userData, setUserData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (values.name !== userData?.name) {
      setLoading(true);
      UserController.updateUser(userData.userId, values)
        .then(async (res) => {
          setLoading(false);
          setUserData(res?.user);
          await setData("userData", res?.user);
          api.success({
            message: "SUCCESS",
            description: "Name updated successfully.",
            placement: "topRight",
          });
        })
        .catch((e) => {
          setLoading(false);
          api.error({
            message: "Fail",
            description: e?.message || "Something went wrong!",
            placement: "topRight",
          });
        });
    }
  };

  return (
    <>
      <Title level={3} style={{ textAlign: "center" }}>
        Profile
      </Title>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 1000 }}
        initialValues={{
          name: userData?.name,
          email: userData?.email,
        }}
      >
        {contextHolder}
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input disabled placeholder="email" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            style={{ backgroundColor: "#2C847B", marginLeft: 10 }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Save
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

export default Profile;
