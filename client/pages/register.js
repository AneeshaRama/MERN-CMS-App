import React, { useState, useContext } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth";
import Router from "next/router";
import Head from "next/head";

const register = () => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API}/signup`, values)
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          setAuth(res.data);
          localStorage.setItem("auth", JSON.stringify(res.data));
          toast.success("successfully registered");
          Router.push("/admin");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>BLOGGER | Register Now</title>
      </Head>
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
                loading={loading}
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
