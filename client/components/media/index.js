import React from "react";
import UploadFile from "./UploadFile";

import { Tabs } from "antd";

const { TabPane } = Tabs;

const Media = ({ setShowPreviewImage, setShowModal }) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Upload File" key="1">
        <UploadFile
          setShowPreviewImage={setShowPreviewImage}
          setShowModal={setShowModal}
        />
      </TabPane>
    </Tabs>
  );
};

export default Media;
