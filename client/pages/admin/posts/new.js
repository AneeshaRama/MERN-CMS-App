import React from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import CreatePost from "../../../components/posts/CreatePost";
const NewPost = () => {
  return (
    <>
      <AdminLayout>
        <CreatePost redirect="/admin/posts" />
      </AdminLayout>
    </>
  );
};

export default NewPost;
