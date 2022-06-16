import React from "react";
import UserComments from "../../components/comments/UserComments";
import AuthorLayout from "../../components/layout/AuthorLayout";

const index = () => {
  return (
    <AuthorLayout>
      <UserComments />
    </AuthorLayout>
  );
};

export default index;
