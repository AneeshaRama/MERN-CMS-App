import React from "react";
import AuthorLayout from "../../components/layout/AuthorLayout";

import Profile from "../../components/Profile";
const profile = () => {
  return (
    <>
      <AuthorLayout>
        <Profile />
      </AuthorLayout>
    </>
  );
};

export default profile;
