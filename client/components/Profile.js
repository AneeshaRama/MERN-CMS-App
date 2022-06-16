import { Button, Col, Input, Row, Typography } from "antd";
import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Router from "next/router";
import { AuthContext } from "../context/auth";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  //Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios
        .put("/update-profile", { name, email, password })
        .then((res) => {
          setLoading(false);
          toast.success(res.data.message);
          setAuth({
            user: null,
            token: "",
          });
          localStorage.removeItem("auth");
          Router.push("/login");
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
      <Row>
        <Col xs={16} lg={16} offset={4}>
          <Typography.Title style={{ color: "maroon" }} level={3}>
            UPDATE MY PROFILE
          </Typography.Title>
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
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="want to change your password?"
            size="large"
            style={{ marginTop: "10px" }}
          />
          <Button
            style={{ marginTop: "20px" }}
            type="primary"
            size="large"
            onClick={handleSubmit}
            loading={loading}
          >
            Update my details
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
