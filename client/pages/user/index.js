import { Button, Col, Row, Typography } from "antd";
import Link from "next/link";
import React, { useContext } from "react";
import UserLayout from "../../components/layout/UserLayout";
import { AuthContext } from "../../context/auth";

const index = () => {
  const [auth] = useContext(AuthContext);
  return (
    <UserLayout>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Typography.Title level={3} style={{ color: "maroon" }}>
            Hello, {auth?.user?.name}
          </Typography.Title>
        </Col>

        <Col span={24} style={{ marginTop: "30px" }}>
          <h1 style={{ fontSize: "18px", textAlign: "center" }}>
            Hey {auth?.user?.name}, Do you have something to share to the world?
            Do you like writing?
            <br />
            Become an{" "}
            <Link href={"/user/become-author"}>
              <a>
                <span
                  style={{
                    fontSize: "18px",
                    color: "maroon",
                    fontWeight: "bold",
                  }}
                >
                  AUTHOR{" "}
                </span>
              </a>
            </Link>
            now.
          </h1>
        </Col>
      </Row>
    </UserLayout>
  );
};

export default index;
