import axios from "axios";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Row, Col, Divider, Typography } from "antd";
import NumberProgress from "../../components/posts/Progress";

const index = () => {
  const [numbers, setNumbers] = useState({
    posts: 0,
    users: 0,
    comments: 0,
    categories: 0,
  });
  const fetchNumbers = async () => {
    try {
      await axios.get("/numbers").then((res) => {
        setNumbers({
          posts: res.data.posts,
          users: res.data.users,
          comments: res.data.comments,
          categories: res.data.categories,
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchNumbers();
  }, []);
  return (
    <>
      <AdminLayout>
        <Row>
          <Col span={24}>
            <Divider>
              <Typography.Title level={3} style={{ color: "maroon" }}>
                CURRENT STATS
              </Typography.Title>
            </Divider>
          </Col>
        </Row>
        <Row>
          <Col
            span={12}
            style={{
              marginTop: "75px",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            <NumberProgress number={numbers.posts} name={"posts"} />
          </Col>
          <Col
            span={12}
            style={{
              marginTop: "75px",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            <NumberProgress number={numbers.users} name={"users"} />
          </Col>
          <Col
            span={12}
            style={{
              marginTop: "75px",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            <NumberProgress number={numbers.categories} name={"categories"} />
          </Col>
          <Col
            span={12}
            style={{
              marginTop: "75px",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            <NumberProgress number={numbers.comments} name={"comments"} />
          </Col>
        </Row>
      </AdminLayout>
    </>
  );
};

export default index;
