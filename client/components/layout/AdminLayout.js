import React, { useState, useEffect, useContext } from "react";
import { Layout } from "antd";
import AdminNav from "../navbar/AdminNav";
import axios from "axios";
import Router from "next/router";
import { AuthContext } from "../../context/auth";
import Loader from "../Loader";
import Head from "next/head";

const AdminLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useContext(AuthContext);
  const { Content } = Layout;

  const fetchAdmin = async () => {
    try {
      await axios.get("/current-user").then(() => {
        setLoading(false);
      });
    } catch (error) {
      Router.push("/");
    }
  };

  useEffect(() => {
    if (auth?.token) fetchAdmin();
  }, [auth?.token]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <Layout style={{ minHeight: "90vh" }}>
        <AdminNav />
        <Layout>
          <Content style={{ padding: "10px" }}>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
