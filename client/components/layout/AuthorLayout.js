import React, { useState, useEffect, useContext } from "react";
import { Layout } from "antd";
import AuthorNav from "../navbar/AuthorNav";
import axios from "axios";
import Router from "next/router";
import { AuthContext } from "../../context/auth";
import Loader from "../Loader";
import Head from "next/head";

const AuthorLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useContext(AuthContext);
  const { Content } = Layout;

  const fetchAuthor = async () => {
    try {
      await axios.get("/current-author").then(() => {
        setLoading(false);
      });
    } catch (error) {
      Router.push("/");
    }
  };

  useEffect(() => {
    if (auth?.token) fetchAuthor();
  }, [auth?.token]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <title>Author Dashboard</title>
      </Head>
      <Layout style={{ minHeight: "90vh" }}>
        <AuthorNav />
        <Layout>
          <Content style={{ padding: "10px" }}>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AuthorLayout;
