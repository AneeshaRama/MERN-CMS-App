import React, { useState } from "react";
import axios from "axios";
import { Row, Col, Card, Typography, List, Avatar } from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import Editor from "rich-markdown-editor";
import CommentForm from "../../components/comments/CommentForm";
import toast from "react-hot-toast";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const SinglePost = ({ singlePost, allComments }) => {
  const [comments, setComments] = useState(allComments);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios
        .post(`/comment/${singlePost._id}`, { content })
        .then((res) => {
          setLoading(false);
          toast.success(res.data.message);
          setComments([res.data.comment, ...comments]);
          setContent("");
        });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to add comment");
    }
  };

  return (
    <>
      <Head>
        <title>{singlePost.title}</title>
        <meta
          name="description"
          content={singlePost.content.substring(0, 150)}
        />
      </Head>
      <div style={{ padding: "15px" }}>
        <Row gutter={12}>
          <Col xs={24} lg={16}>
            <Card
              cover={
                <img
                  src={
                    singlePost?.featuredImage?.url ||
                    "https://res.cloudinary.com/jamesmarycloud/image/upload/v1655295170/BLOGGER/default-image_utrmmd.jpg"
                  }
                  alt={singlePost.title}
                />
              }
            >
              <Typography.Title>{singlePost.title}</Typography.Title>
              <p>
                Posted by{" "}
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {singlePost.postedBy.name}
                </span>{" "}
                on {dayjs(singlePost.createdAt).format("MMMM d, YYYY hh:mm A")}
              </p>
              <Editor
                defaultValue={singlePost.content}
                className="content"
                // dark={true}
                readOnly={true}
              />
            </Card>
            <CommentForm
              content={content}
              setContent={setContent}
              loading={loading}
              handleSubmit={handleSubmit}
            />
            <br />
            <br />
            <List
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item) => (
                <List.Item key={item._id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar>{item?.postedBy?.name[0].toUpperCase()}</Avatar>
                    }
                    title={item?.postedBy?.name}
                    description={`${item.content} -   ${dayjs(
                      item.createdAt
                    ).fromNow()}`}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col xs={24} lg={8}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Reprehenderit natus dolorum quibusdam itaque hic. Id laboriosam
            corrupti dolores quibusdam cumque? Tenetur consectetur non alias
            earum dignissimos provident perspiciatis eius ex.
          </Col>
        </Row>
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`/post/${params.slug}`);
  return {
    props: {
      singlePost: data.post,
      allComments: data.comments,
    },
  };
}

export default SinglePost;
