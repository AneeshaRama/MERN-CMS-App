import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Row, List, Button, Typography } from "antd";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import axios from "axios";
import toast from "react-hot-toast";
import Router from "next/router";
import { AuthContext } from "../../../context/auth";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const index = () => {
  const [auth] = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAllComments = async () => {
    try {
      await axios.get(`/comments/1`).then((res) => {
        setComments(res.data.allComments);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCommentCount = async () => {
    try {
      await axios.get("/comments-count").then((res) => {
        setTotal(res.data.count);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadMoreComments = async () => {
    try {
      setLoading(true);
      await axios.get(`/comments/${page}`).then((res) => {
        setComments([...comments, ...res.data.allComments]);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCommentCount();
  }, []);

  useEffect(() => {
    if (auth?.token) fetchAllComments();
  }, [auth?.token]);

  useEffect(() => {
    if (page === 1) return;
    if (auth?.token) loadMoreComments();
  }, [page]);

  //delete
  const handleDelete = async (item) => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (!answer) return;
      await axios.delete(`/comment/${item._id}`).then((res) => {
        setComments(comments.filter((c) => c._id !== res.data.comment._id));
        toast.success(res.data.message);
      });
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  return (
    <>
      <AdminLayout>
        <Typography.Title level={3}>TOTAL COMMENTS : {total}</Typography.Title>
        <Row>
          <Col span={24}>
            <List
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link href={`/post/${item?.postId?.slug}`}>
                      <a>view</a>
                    </Link>,
                    <a onClick={() => handleDelete(item)}>
                      <DeleteOutlined />
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    title={item?.content}
                    description={` On ${item?.postId?.title} | by ${
                      item?.postedBy?.name
                    } | ${dayjs(item?.createdAt).format("L LT")} `}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
        {comments?.length < total && (
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <br />
              <br />
              <Button
                type="primary"
                onClick={() => setPage(page + 1)}
                loading={loading}
              >
                Load more
              </Button>
            </Col>
          </Row>
        )}
      </AdminLayout>
    </>
  );
};

export default index;
