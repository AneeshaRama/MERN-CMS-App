import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Input, Button, Typography } from "antd";
import Link from "next/link";

const CommentForm = ({ setContent, loading, handleSubmit, content }) => {
  const [auth] = useContext(AuthContext);

  return (
    <>
      <br />
      {auth?.user === null && auth?.token === "" && (
        <Link href="/login">
          <a> Please login to leave a comment</a>
        </Link>
      )}
      <Input.TextArea
        value={content}
        placeholder="Leave a comment...."
        rows={5}
        maxLength={200}
        onChange={(e) => setContent(e.target.value)}
        disabled={auth?.user === null && auth?.token === ""}
      />
      <br />
      <br />
      <Button
        disabled={(auth?.user === null && auth?.token === "") || content === ""}
        loading={loading}
        onClick={handleSubmit}
        type="primary"
      >
        Post
      </Button>
    </>
  );
};

export default CommentForm;
