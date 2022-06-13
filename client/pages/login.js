import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, Checkbox } from "@ant-design/icons";
import Link from "next/link";

const login = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <>
      <div className="login-container">
        <div className="login-wrapper">
          <h1 style={{ paddingTop: "120px" }}>Login</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
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
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password?
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          <span>
            Not yet registered?
            <Link href="/login">
              <a> Register Now</a>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default login;
