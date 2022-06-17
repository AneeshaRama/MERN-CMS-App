import { Button, Col, Row, Typography } from "antd";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import AuthorLayout from "../../components/layout/AuthorLayout";
import { AuthContext } from "../../context/auth";

const index = () => {
  const [auth] = useContext(AuthContext);
  return (
    <AuthorLayout>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Typography.Title level={3} style={{ color: "maroon" }}>
            Hello, {auth?.user?.name ? auth.user.name : "Author"}
          </Typography.Title>
        </Col>

        <Col
          span={24}
          style={{
            marginTop: "30px",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          <h1 style={{ fontSize: "18px" }}>
            Start writing to share your information, thoughts to the world{" "}
            <Link href="/author/posts/new">
              <a>NOW</a>
            </Link>
          </h1>
        </Col>
      </Row>
    </AuthorLayout>
  );
};

export default index;
