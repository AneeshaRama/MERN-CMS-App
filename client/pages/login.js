import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";
import Head from "next/head";
import Loader from "../components/Loader";

const login = () => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [loader, setLoader] = useState(true);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (auth?.user === null) {
      setLoader(false);
    } else {
      router.push("/");
    }
  }, [auth]);

  if (loader) {
    return <Loader />;
  }

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios
        .post(`/signin`, values)
        .then((res) => {
          setLoading(false);
          toast.success("Successfully signed in");
          setAuth(res.data);
          localStorage.setItem("auth", JSON.stringify(res.data));
          form.resetFields();
          router.push("/");
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
        <title>BLOGGER | Login</title>
      </Head>
      <div className="login-container">
        <div className="login-wrapper">
          <h1 style={{ paddingTop: "120px" }}>Login</h1>
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
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
                size="large"
                autoComplete="off"
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
                size="large"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          <span>
            Not yet registered?
            <Link href="/register">
              <a> Register Now</a>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default login;
