import React, { useState, useEffect, useContext } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import Editor from "rich-markdown-editor";
import { Input, Select, Modal, Button, Image } from "antd";
import axios from "axios";
import { uploadImage } from "../../../utils/uploadImage";
import toast from "react-hot-toast";
import Router from "next/router";
import { UploadOutlined } from "@ant-design/icons";
import Media from "../../../components/media";
import { PostContext } from "../../../context/post";

const NewPost = () => {
  //load from localStorage
  const savedTitle = () => {
    if (process.browser) {
      if (localStorage.getItem("post-title")) {
        return JSON.parse(localStorage.getItem("post-title"));
      }
    }
  };
  const savedContent = () => {
    if (process.browser) {
      if (localStorage.getItem("post-content")) {
        return JSON.parse(localStorage.getItem("post-content"));
      }
    }
  };

  const [title, setTitle] = useState(savedTitle());
  const [content, setContent] = useState(savedContent());
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPreviewImage, setShowPreviewImage] = useState([]);
  const [post, setPost] = useContext(PostContext);

  const fetchCategories = async () => {
    await axios.get("/categories").then((res) => {
      setLoadedCategories(res.data.categories);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handlePublish = async () => {
    setLoading(true);
    try {
      await axios
        .post("/post/new", {
          title,
          content,
          categories,
          featuredImage: showPreviewImage?.media?._id,
        })
        .then((res) => {
          setLoading(false);
          setPost((prev) => ({
            ...prev,
            posts: [res.data.post, ...post.posts],
          }));
          toast.success(res.data.message);
          localStorage.removeItem("post-title");
          localStorage.removeItem("post-content");
          setShowPreviewImage(null);
          Router.push("/admin/posts");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to publish post!");
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="category-container">
          <div sty className="create-post-wrapper">
            <h1>Create new Post</h1>
            <Input
              size="large"
              placeholder="Add post title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                localStorage.setItem(
                  "post-title",
                  JSON.stringify(e.target.value)
                );
              }}
            />
            <br />
            <br />
            <div className="editor-scroll">
              <Editor
                defaultValue={content}
                onChange={(e) => {
                  setContent(e());
                  localStorage.setItem("post-content", JSON.stringify(e()));
                }}
                uploadImage={uploadImage}
              />
            </div>
            <Button
              style={{ marginTop: "10px" }}
              onClick={() => setVisible(true)}
              type="primary"
            >
              Preview
            </Button>
            <br />
            <Button
              style={{ marginTop: "10px" }}
              onClick={() => setShowModal(true)}
              type="primary"
            >
              <UploadOutlined />
              Featured Image
            </Button>
            <br />
            <br />
            {showPreviewImage !== null && (
              <Image src={showPreviewImage?.media?.url} width="100" />
            )}
            <br />
          </div>
          <br />
          <h1>Categories</h1>
          <Select
            size="large"
            mode="multiple"
            allowClear={true}
            placeholder="Select Categories"
            style={{ width: "50vw" }}
            onChange={(e) => setCategories(e)}
          >
            {loadedCategories.map((item) => (
              <Select.Option key={item.name}>{item.name}</Select.Option>
            ))}
          </Select>
          <Button
            style={{
              marginTop: "10px",
              backgroundColor: "maroon",
              border: "none",
              fontWeight: "bold",
              padding: "5px 25px",
            }}
            type="primary"
            onClick={handlePublish}
            loading={loading}
          >
            Publish
          </Button>
        </div>
        <Modal
          title="Preview"
          centered
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <h1>{title}</h1>
          <Editor defaultValue={content} readOnly={true} />
        </Modal>
        <Modal
          onCancel={() => setShowModal(false)}
          visible={showModal}
          title="Featured Image"
          footer={null}
        >
          <Media
            setShowPreviewImage={setShowPreviewImage}
            setShowModal={setShowModal}
          />
        </Modal>
      </AdminLayout>
    </>
  );
};

export default NewPost;
