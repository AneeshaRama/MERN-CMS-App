import React, { useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Row, Col, Input, Button, Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import generator from "generate-password";
import Router from "next/router";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios
        .post("/create-user", { name, email, password, role })
        .then((res) => {
          setLoading(false);
          toast.success(res.data.message);
          Router.push("/admin/users");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      toast.error("Signup failed");
    }
  };

  return (
    <>
      <AdminLayout>
        <Row>
          <Col xs={16} lg={16} offset={4}>
            <h1 style={{ marginTop: "10px" }}>Add new user</h1>
            <Input
              style={{ marginTop: "10px" }}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              size="large"
              value={name}
            />
            <Input
              style={{ marginTop: "10px" }}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              size="large"
              value={email}
            />
            <div style={{ display: "flex", alignItems: "cenetr" }}>
              <Button
                style={{ marginTop: "10px" }}
                onClick={() => setPassword(generator.generate({ length: 32 }))}
                size="large"
                type="ghost"
              >
                Generate password
              </Button>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="large"
                style={{ marginTop: "10px" }}
              />
            </div>
            <Select
              defaultValue="User"
              style={{ marginTop: "10px", width: "100%" }}
              onChange={(e) => setRole(e)}
              size="large"
            >
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="author">Author</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
            <Button
              style={{ marginTop: "20px" }}
              type="primary"
              size="large"
              onClick={handleSubmit}
              loading={loading}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </AdminLayout>
    </>
  );
};

export default AddUser;
