import React from "react";
import { Form, Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  Checkbox,
  MailOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const register = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="login-container">
        <div className="login-wrapper">
          <h1 style={{ paddingTop: "120px" }}>Register</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Your name"
                type="text"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Your email address"
                type="email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="New password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <span>
            Already registered?
            <Link href="/login">
              <a> Login Now</a>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default register;
