import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import React from "react";

const CategoryUpdateModal = ({
  visible,
  setVisible,
  loading,
  handleUpdate,
  updateCategory,
}) => {
  return (
    <Modal
      title="Update category"
      footer={null}
      onCancel={() => setVisible(false)}
      visible={visible}
    >
      <Form
        autoComplete="off"
        onFinish={handleUpdate}
        fields={[{ name: ["name"], value: updateCategory.name }]}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter category name",
            },
          ]}
        >
          <Input
            prefix={<EditOutlined className="site-form-item-icon" />}
            placeholder="Categoriy name"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Update Category
        </Button>
      </Form>
    </Modal>
  );
};

export default CategoryUpdateModal;
