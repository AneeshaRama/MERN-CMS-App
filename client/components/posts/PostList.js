import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";

const PostList = ({ handleDelete, handleEdit, item }) => {
  return (
    <>
      <div
        key={item._id}
        style={{
          backgroundColor: "rgb(193, 220, 245)",
          marginTop: "5px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <div>
          <h1>{item.title}</h1>
        </div>
        <div>
          <EditOutlined
            onClick={() => handleEdit(item)}
            style={{
              marginRight: "20px",
              cursor: "pointer",
              color: "#1890ff",
              fontSize: "18px",
            }}
          />
          <DeleteOutlined
            onClick={() => handleDelete(item)}
            style={{
              cursor: "pointer",
              color: "#1890ff",
              fontSize: "18px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PostList;
