import { PlusOutlined } from "@ant-design/icons";
import { Col, Row, Button } from "antd";
import Link from "next/link";
import React from "react";
import AdminLayout from "../../../components/layout/AdminLayout";

const index = () => {
  return (
    <>
      <AdminLayout>
        <Row>
          <Col span={24}>
            <Link href="/admin/posts/new">
              <a>
                <Button type="primary" style={{ margin: "10px" }}>
                  <PlusOutlined />
                  Add new
                </Button>
              </a>
            </Link>
          </Col>
        </Row>
      </AdminLayout>
    </>
  );
};

export default index;
