import React from "react";
import axios from "axios";
import { Row, Col, Card, Avatar } from "antd";
import Head from "next/head";
import Link from "next/link";

const posts = ({ allPosts }) => {
  console.log(allPosts);
  return (
    <>
      <Head>
        <title>Recent blogs</title>
        <meta
          name="description"
          content="Blogs about Web development , travel, Health and more"
        />
      </Head>
      <div style={{ padding: "15px" }}>
        <Row gutter={12}>
          {allPosts.map((post) => {
            return (
              <Col
                xs={24}
                md={12}
                lg={8}
                xl={6}
                key={post._id}
                style={{ marginTop: "10px", marginBottom: "20px" }}
              >
                <Link href={`/post/${post.slug}`}>
                  <a>
                    <Card
                      style={{
                        backgroundColor: "#001529",
                      }}
                      hoverable
                      cover={
                        <Avatar
                          shape="square"
                          style={{ height: "200px" }}
                          src={
                            post?.featuredImage?.url ||
                            "https://res.cloudinary.com/jamesmarycloud/image/upload/v1655295170/BLOGGER/default-image_utrmmd.jpg"
                          }
                          alt={post.title}
                        />
                      }
                    >
                      <Card.Meta title={post.title} />
                    </Card>
                  </a>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`/posts`);
  return {
    props: {
      allPosts: data.posts,
    },
  };
}

export default posts;
