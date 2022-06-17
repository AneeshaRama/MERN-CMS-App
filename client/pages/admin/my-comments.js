import React from "react";
import UserComments from "../../components/comments/UserComments";
import AdminLayout from "../../components/layout/AdminLayout";

const index = () => {
  return (
    <AdminLayout>
      <UserComments />
    </AdminLayout>
  );
};

export default index;
