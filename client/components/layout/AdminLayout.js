import React from "react";
import { Layout } from "antd";
import AdminNav from "../navbar/AdminNav";

const AdminLayout = ({ children }) => {
  const { Content, Sider } = Layout;
  return (
    <>
      <Layout>
        <AdminNav />
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
