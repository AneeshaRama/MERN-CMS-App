import React, { useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Button, Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";

const categories = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios
        .post(`/category`, values)
        .then((res) => {
          setLoading(false);
          toast.success(res.data.message);
          console.log(res);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to create new category");
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="category-container">
          <h1>CATEGORIES</h1>
          <div className="category-form-wrapper">
            <Form onFinish={onFinish}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter category name",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Categoriy name"
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Add Category
              </Button>
            </Form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default categories;
