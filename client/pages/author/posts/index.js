import { PlusOutlined } from "@ant-design/icons";
import { Col, Row, Button } from "antd";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import AuthorLayout from "../../../components/layout/AuthorLayout";
import { PostContext } from "../../../context/post";
import axios from "axios";
import toast from "react-hot-toast";
import Router from "next/router";
import PostList from "../../../components/posts/PostList";
import { AuthContext } from "../../../context/auth";
import Loader from "../../../components/Loader";

const index = () => {
  const [post, setPost] = useContext(PostContext);
  const { auth } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchAllPostsByAuthor();
  }, []);

  const fetchAllPostsByAuthor = async () => {
    setLoader(true);

    try {
      await axios
        .get("/posts")
        .then((res) => setPost((prev) => ({ ...prev, posts: res.data.posts })));
      setLoader(false);
    } catch (error) {
      console.log(error.message);
    }
  };

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
          setPost((prev) => ({
            ...prev,
            posts: post.posts.filter((p) => p._id !== res.data.post._id),
          }));
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
            <Button type="primary" style={{ margin: "10px" }}>
              <Link href="/author/posts/new">
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
