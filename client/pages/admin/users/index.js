import React, { useState, useEffect, useContext } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { AuthContext } from "../../../context/auth";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import { Avatar, Col, List, Row, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const index = () => {
  const [auth] = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const fetchAllUsers = async () => {
    try {
      await axios.get("/users").then((res) => {
        setUsers(res.data.users);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (auth?.token) fetchAllUsers();
  }, [auth?.token]);

  //delete user
  const handleDelete = async (item) => {
    try {
      if (item._id === auth.user._id) {
        toast.error("You cannot delete yourself");
        return;
      }
      await axios.delete(`/user/${item._id}`).then((res) => {
        toast.success(res.data.message);
        setUsers(users.filter((user) => user._id !== res.data.user._id));
      });
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <>
      <AdminLayout>
        <Row>
          <Col span={24}>
            <Typography.Title type="danger" level={2}>
              TOTAL USERS : {users.length}
            </Typography.Title>
            <List
              itemLayout="horizontal"
              dataSource={users}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link href={`/admin/users/${item._id}`}>
                      <a>
                        <EditOutlined style={{ fontSize: "18px" }} />
                      </a>
                    </Link>,
                    <DeleteOutlined
                      style={{
                        fontSize: "18px",
                        color: "#1890ff",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(item)}
                    />,
                  ]}
                >
                  <Avatar src={item?.image?.url}>a</Avatar>
                  <List.Item.Meta
                    title={item.name}
                    style={{ marginLeft: "10px" }}
                  />
                  <List.Item.Meta
                    title={item.email}
                    style={{ marginLeft: "10px" }}
                  />
                  <List.Item.Meta
                    title={item.role}
                    style={{ marginLeft: "10px" }}
                  />
                  <List.Item.Meta
                    title={`${item?.posts?.length} post`}
                    style={{ marginLeft: "10px" }}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </AdminLayout>
    </>
  );
};

export default index;
