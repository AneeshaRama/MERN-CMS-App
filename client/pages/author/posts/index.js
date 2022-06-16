import { PlusOutlined } from "@ant-design/icons";
import { Col, Row, Button, Typography } from "antd";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import AuthorLayout from "../../../components/layout/AuthorLayout";
import axios from "axios";
import toast from "react-hot-toast";
import Router from "next/router";
import PostList from "../../../components/posts/PostList";
import { AuthContext } from "../../../context/auth";
import Loader from "../../../components/Loader";

const index = () => {
  const [posts, setPosts] = useState([]);
  const [auth] = useContext(AuthContext);
  const [loader, setLoader] = useState(false);

  const fetchUserPosts = async () => {
    try {
      await axios.get("/user-posts").then((res) => {
        setPosts(res.data.posts);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchUserPosts();
  }, [auth?.token]);

  //edit
  const handleEdit = (item) => {
    Router.push(`/author/posts/${item.slug}`);
  };

  //delete
  const handleDelete = async (item) => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (!answer) return;
      await axios
        .delete(`/post/${item._id}`)
        .then((res) => {
          toast.success(res.data.message);
          setPosts(posts.filter((p) => p._id !== res.data.post._id));
        })
        .catch((err) => toast.error(err.response.data.message));
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };
  if (loader) return <Loader />;

  return (
    <>
      <AuthorLayout>
        <Row>
          <Col span={24}>
            <Typography.Title level={3}>
              TOTAL POSTS : {posts.length}
            </Typography.Title>
            <br />
            <Button type="primary" style={{ margin: "10px" }} size="large">
              <Link href="/author/posts/new">
                <a>
                  <PlusOutlined />
                  Add new
                </a>
              </Link>
            </Button>
            <br />

            {posts.map((item) => {
              return (
                <PostList
                  key={item._id}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  item={item}
                />
              );
            })}
          </Col>
        </Row>
      </AuthorLayout>
    </>
  );
};

export default index;
