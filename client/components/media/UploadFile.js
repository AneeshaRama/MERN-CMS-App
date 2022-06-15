import React, { useContext } from "react";
import { Upload, Button, message } from "antd";
import { AuthContext } from "../../context/auth";
import { UploadOutlined } from "@ant-design/icons";

const UploadFile = ({ setShowPreviewImage, setShowModal }) => {
  const [auth] = useContext(AuthContext);

  const props = {
    name: "file",
    action: `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
    headers: {
      authorization: `Bearer ${auth.token}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(` File uploaded successfully`);
        setShowPreviewImage(info.file.response);
        setShowModal(false);
      } else if (info.file.status === "error") {
        message.error(`File upload failed.`);
      }
    },
  };

  return (
    <>
      <Upload {...props} maxCount={1}>
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </>
  );
};

export default UploadFile;
