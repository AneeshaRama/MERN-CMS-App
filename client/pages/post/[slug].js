import React from "react";
import axios from "axios";
import { Row, Col, Card, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import Editor from "rich-markdown-editor";

const SinglePost = ({ singlePost }) => {
  console.log(singlePost);
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
    },
  };
}

export default SinglePost;
