import React, { useState, useEffect, useContext } from "react";
import { Layout } from "antd";
import UserNav from "../navbar/UserNav";
import axios from "axios";
import Router from "next/router";
import { AuthContext } from "../../context/auth";
import Loader from "../Loader";
import Head from "next/head";

const UserLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useContext(AuthContext);
  const { Content } = Layout;

  const fetchUser = async () => {
    try {
      await axios.get("/current-user").then(() => {
        setLoading(false);
      });
    } catch (error) {
      Router.push("/");
    }
  };

  useEffect(() => {
    if (auth?.token) fetchUser();
  }, [auth?.token]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <title>User Dashboard</title>
      </Head>
      <Layout style={{ minHeight: "90vh" }}>
        <UserNav />
        <Layout>
          <Content style={{ padding: "10px" }}>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default UserLayout;
