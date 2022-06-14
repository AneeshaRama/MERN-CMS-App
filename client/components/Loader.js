import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

const Loader = () => {
  return (
    <>
      <div className="loader">
        <LoadingOutlined
          style={{
            color: "#1890ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "70px",
          }}
        />
      </div>
    </>
  );
};

export default Loader;
