import React, { useState, useEffect, useContext } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Row, Col, Input, Button, Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/auth";
import Router from "next/router";

const index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth] = useContext(AuthContext);
  const [userId, setUserId] = useState("");

  const fetchUser = async () => {
    try {
      await axios.get(`/user/${Router.query.id}`).then((res) => {
        setUserId(res.data.user._id);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setRole(res.data.user.role);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchUser();
  }, [auth?.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`/update-user-by-admin/${userId}`, {
          name,
          email,
          role,
        })
        .then((res) => {
          toast.success(res.data.message);
          Router.push("/admin/users");
        });
    } catch (error) {
      setLoading(false);
      toast.error("Update user failed");
    }
  };

  return (
    <>
      <AdminLayout>
        <Row>
          <Col xs={16} lg={16} offset={4}>
            <h1 style={{ marginTop: "10px" }}>Update user</h1>
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
            <Select
              value={role}
              style={{ marginTop: "10px", width: "100%" }}
              onChange={(e) => setRole(e)}
              size="large"
            >
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="author">Author</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
            <Button
              style={{
                marginTop: "20px",
              }}
              type="primary"
              size="large"
              onClick={handleSubmit}
              loading={loading}
            >
              Update user info
            </Button>
          </Col>
        </Row>
      </AdminLayout>
    </>
  );
};

export default index;
