import React, { useState, useContext } from "react";
import { Upload, Space, Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddPackageItem = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { currentValues, parentCallback } = useContext(AppContext);

  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [itemNumber] = useState(currentValues?.items?.length + 1);

  const onFinish = async (values) => {
    parentCallback({
      items: [
        ...currentValues?.items,
        {
          name: values.name,
          itemNumber,
          itemImage: imageUrl,
          keywords,
        },
      ],
    });

    setTimeout(() => {
      navigate("/create-box");
    }, 500);
  };

  const onReset = () => {
    form.resetFields();
    setLoading(false);
  };

  const handleAddTag = () => {
    if (keyword) {
      setKeywords([...keywords, keyword]);
      setKeyword("");
      // form.setFieldValue("keyword", "");
      // onReset();
    }
  };

  const handleChange = ({ fileList: newFileList }) => {
    setLoading(true);
    setFileList(newFileList);
  };

  const handleImageUpload = async (data) => {
    if (data) {
      const formData = new FormData();
      formData.append("image", data?.file);

      try {
        const response = await fetch(
          "https://api.imgbb.com/1/upload?key=755cd40349b781d801c71cbd0fc6e737",
          {
            method: "POST",
            body: formData,
          }
        );
        setLoading(false);
        if (response.ok) {
          const data = await response.json();
          const obj = {
            uid: data.data.id,
            name: data.data.name,
            status: "done",
            url: data.data.url,
          };
          setFileList([obj]);
          setImageUrl(data.data.url);
        } else {
          console.error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <Title level={3} style={{ textAlign: "center" }}>
        Add Item
      </Title>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        initialValues={{}}
      >
        <Form.Item
          label="Item image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            customRequest={handleImageUpload}
            onChange={handleChange}
            fileList={fileList}
            onPreview={onPreview}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          name="name"
          label="Item name"
          rules={[{ required: true, message: "Item name is required" }]}
        >
          <Input placeholder="Item name" />
        </Form.Item>
        <Form.Item
          name="keyword"
          label="Keyword"
          rules={[{ required: true, message: "Keyword is required" }]}
        >
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input
              onChange={(e) => setKeyword(e.target.value)}
              defaultValue=""
              placeholder="Keyword"
            />
            <Button
              type="primary"
              style={{ backgroundColor: "#1777ff", marginLeft: 0 }}
              htmlType="button"
              onClick={handleAddTag}
            >
              ADD
            </Button>
          </Space.Compact>

          {/* <Button type="primary">Submit</Button> */}
        </Form.Item>

        <div
          className="flex mb-6"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="flex overflow-x-auto">
            {keywords?.map((keyword, index) => (
              <div
                key={index}
                className="px-2 py-1 bg-gray-500 text-white rounded mr-2"
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>

        <Form.Item {...tailLayout}>
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

export default AddPackageItem;
