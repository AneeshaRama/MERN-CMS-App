import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import { CaretUpOutlined } from "@ant-design/icons";
import Link from "next/link";
import NumberProgress from "../components/posts/Progress";
import axios from "axios";

const index = () => {
  const [numbers, setNumbers] = useState({
    posts: 0,
    users: 0,
    comments: 0,
    categories: 0,
  });
  const fetchNumbers = async () => {
    try {
      await axios.get("/numbers").then((res) => {
        setNumbers({
          posts: res.data.posts,
          users: res.data.users,
          comments: res.data.comments,
          categories: res.data.categories,
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchNumbers();
  }, []);
  return (
    <>
      <div className="home-image">
        <img
          src="https://res.cloudinary.com/jamesmarycloud/image/upload/v1655414655/BLOGGER/HomePage_hl9p3w.webp"
          style={{
            width: "100%",
            height: "62vh",
            objectFit: "cover",
            overflow: "hidden",
          }}
          alt=""
        />
        <div className="home-title">
          <h1>BLOGGER</h1>
          <p>Read and write your favourite topics</p>
          <Link href="/posts">
            <a>
              <Button size="large">
                {" "}
                <CaretUpOutlined spin /> I AM EXITED
              </Button>
            </a>
          </Link>
        </div>
      </div>
      <div>
        <Row>
          <Col
            span={12}
            style={{
              marginTop: "75px",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            <NumberProgress number={numbers.posts} name={"posts"} />
          </Col>

          <Col
            span={12}
            style={{
              marginTop: "75px",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            <NumberProgress number={numbers.categories} name={"categories"} />
          </Col>
        </Row>
      </div>
      <div className="register-now">
        <h1>Not a member? Register now. It's free!</h1>
        <Link href={"/register"}>
          <a>
            <Button size="large">JOIN NOW</Button>
          </a>
        </Link>
      </div>
    </>
  );
};

export default index;
