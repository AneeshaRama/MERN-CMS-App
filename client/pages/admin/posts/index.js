import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Row, Button } from "antd";
import Link from "next/link";
import React, { useContext } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { PostContext } from "../../../context/post";
import axios from "axios";

const index = () => {
  const [post] = useContext(PostContext);

  //edit
  const handleEdit = (item) => {
    alert("Edit", item);
  };

  //delete
  const handleDelete = (item) => {
    alert(item.slug);
  };

  return (
    <>
      <AdminLayout>
        <Row>
          <Col span={24}>
            <Button type="primary" style={{ margin: "10px" }}>
              <Link href="/admin/posts/new">
                <a>
                  <PlusOutlined />
                  Add new
                </a>
              </Link>
            </Button>
            <h1
              style={{
                marginTop: "10px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Total Posts: {post.posts.length}
            </h1>
            <br />

            {post.posts.map((item) => {
              return (
                <div
                  key={item._id}
                  style={{
                    backgroundColor: "rgb(193, 220, 245)",
                    marginTop: "5px",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <div>
                    <h1>{item.title}</h1>
                  </div>
                  <div>
                    <EditOutlined
                      onClick={() => handleEdit(item)}
                      style={{
                        marginRight: "20px",
                        cursor: "pointer",
                        color: "#1890ff",
                        fontSize: "18px",
                      }}
                    />
                    <DeleteOutlined
                      onClick={() => handleDelete(item)}
                      style={{
                        cursor: "pointer",
                        color: "#1890ff",
                        fontSize: "18px",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </AdminLayout>
    </>
  );
};

export default index;
