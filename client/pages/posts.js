import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Avatar, Button } from "antd";
import Head from "next/head";
import Link from "next/link";

const posts = ({ allPosts }) => {
  const [posts, setPosts] = useState(allPosts);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getTotal = async () => {
    try {
      await axios.get("/post-count").then((res) => {
        setTotal(res.data.count);
      });
    } catch (error) {
      console.log("Failed to get count");
    }
  };
  const loadMorePosts = async () => {
    setLoading(true);
    try {
      await axios.get(`/load-posts/${page}`).then((res) => {
        setPosts([...posts, ...res.data.posts]);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMorePosts();
  }, [page]);

  useEffect(() => {
    getTotal();
  }, []);

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
          {posts.map((post) => {
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
                            "https://res.cloudinary.com/jamesmarycloud/image/upload/v1655471668/BLOGGER/default-image_m14xy3.jpg"
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
        {posts?.length < total && (
          <Row>
            <Col
              span={24}
              style={{
                textAlign: "center",
              }}
            >
              <Button
                style={{
                  backgroundColor: "maroon",
                  color: "white",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                type="default"
                onClick={() => setPage(page + 1)}
                loading={loading}
              >
                Load more
              </Button>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`/load-posts/1`);
  return {
    props: {
      allPosts: data.posts,
    },
  };
}

export default posts;
