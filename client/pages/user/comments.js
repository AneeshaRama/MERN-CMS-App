import React from "react";
import UserComments from "../../components/comments/UserComments";
import UserLayout from "../../components/layout/UserLayout";

const comments = () => {
  return (
    <UserLayout>
      <UserComments />
    </UserLayout>
  );
};

export default comments;
