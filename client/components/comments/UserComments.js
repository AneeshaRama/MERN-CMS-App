import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Row, List, Button, Typography, Modal, Input } from "antd";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import Router from "next/router";
import { AuthContext } from "../../context/auth";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const UserComments = () => {
  const [auth] = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState({});

  const fetchAllComments = async () => {
    try {
      await axios.get(`/user-comments`).then((res) => {
        setComments(res.data.allComments);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (auth?.token) fetchAllComments();
  }, [auth?.token]);

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

  //update
  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put(`/comment/${selected._id}`, { content }).then((res) => {
        setLoading(false);
        toast.success(res.data.message);

        const newComments = comments.map((c) => {
          if (c._id === res.data.comment._id) {
            return res.data.comment;
          }
          return c;
        });
        setComments(newComments);
        setContent("");
        setSelected({});
        setModal(false);
      });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update post");
    }
  };

  return (
    <>
      <Typography.Title level={3}>
        TOTAL COMMENTS : {comments.length}
      </Typography.Title>
      <Row>
        <Col span={24}>
          <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a>
                    <EditOutlined
                      style={{ marginRight: "15px", fontSize: "18px" }}
                      onClick={() => {
                        setSelected(item);
                        setModal(true);
                        setContent(item?.content);
                      }}
                    />
                  </a>,

                  <a onClick={() => handleDelete(item)}>
                    <DeleteOutlined style={{ fontSize: "18px" }} />
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
      <Modal
        visible={modal}
        onCancel={() => setModal(false)}
        footer={null}
        title="Update your comment"
      >
        <Input.TextArea
          rows={5}
          defaultValue={content}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <br />

        <Button loading={loading} type="primary" onClick={handleUpdate}>
          Update comment
        </Button>
      </Modal>
    </>
  );
};

export default UserComments;
