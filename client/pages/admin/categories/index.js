import React, { useState, useEffect } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Button, Form, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryUpdateModal from "../../../components/modal/CategoryUpdateModal";

const categories = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [updateCategory, setUpdateCategory] = useState({});
  const [visible, setVisible] = useState(false);

  //fetch categories
  const fetchCategories = async () => {
    try {
      await axios.get("/categories").then((res) => {
        setCategories(res.data.categories);
      });
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //create category
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios
        .post(`/category`, values)
        .then((res) => {
          setLoading(false);
          setCategories([res.data.category, ...categories]);
          toast.success(res.data.message);
          form.resetFields();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to create new category");
    }
  };

  //delete category
  const handleDelete = async (item) => {
    try {
      await axios.delete(`/category/${item.slug}`).then((res) => {
        toast.success(res.data.message);
        setCategories(
          categories.filter(
            (category) => category._id !== res.data.category._id
          )
        );
      });
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  //edit
  const handleEdit = (item) => {
    setUpdateCategory(item);
    setVisible(true);
  };

  //update category
  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      await axios
        .put(`/category/${updateCategory.slug}`, values)
        .then((res) => {
          setLoading(false);
          toast.success(res.data.message);
          setVisible(false);
          const newCategories = categories.map((cat) => {
            if (cat._id === res.data.category._id) {
              return res.data.category;
            }
            return cat;
          });
          setCategories(newCategories);
          setUpdateCategory({});
        });
    } catch (error) {
      setLoading(false);
      toast.error("Category update failed");
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="category-container">
          <h1>CATEGORIES</h1>
          <div className="category-form-wrapper">
            <Form autoComplete="off" onFinish={onFinish} form={form}>
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
                Add Category
              </Button>
            </Form>
          </div>
          <div>
            {categories?.map((item) => {
              return (
                <div key={item._id} className="category-list">
                  <span style={{ marginRight: "40px", fontSize: "18px" }}>
                    {item.name}
                  </span>
                  <EditOutlined
                    onClick={() => handleEdit(item)}
                    style={{
                      marginRight: "15px",
                      color: "#1890ff",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  />
                  <DeleteOutlined
                    style={{
                      color: "#1890ff",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                    onClick={() => handleDelete(item)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <CategoryUpdateModal
          visible={visible}
          setVisible={setVisible}
          loading={loading}
          handleUpdate={handleUpdate}
          updateCategory={updateCategory}
        />
      </AdminLayout>
    </>
  );
};

export default categories;
