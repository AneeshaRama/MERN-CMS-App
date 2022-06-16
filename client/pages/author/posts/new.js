import React from "react";
import AuthorLayout from "../../../components/layout/AuthorLayout";
import CreatePost from "../../../components/posts/CreatePost";

const index = () => {
  return (
    <AuthorLayout>
      <CreatePost redirect="/author/posts" />
    </AuthorLayout>
  );
};

export default index;
