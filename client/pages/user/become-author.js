import { Col, Input, Row, Typography, Button } from "antd";
import React, { useContext, useState } from "react";
import UserLayout from "../../components/layout/UserLayout";
import axios from "axios";
import toast from "react-hot-toast";
import Router from "next/router";
import { AuthContext } from "../../context/auth";

const becomeAuthor = () => {
  const [value, setValue] = useState("");
  const [auth, setAuth] = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      await axios.put("/become-author").then((res) => {
        toast.success(res.data.message);
        setAuth({
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
        Router.push("/login");
      });
    } catch (error) {
      toast.error("Failed to submit");
    }
  };

  return (
    <>
      <UserLayout>
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Typography.Title level={3} style={{ color: "maroon" }}>
              I WANT TO BECOME AN AUTHOR
            </Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Input.TextArea
              cols={10}
              rows={5}
              placeholder="Share your previous experiance with us..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <br />
            <br />
            <Button
              disabled={value === ""}
              type="primary"
              onClick={handleSubmit}
              size="large"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </UserLayout>
    </>
  );
};

export default becomeAuthor;
