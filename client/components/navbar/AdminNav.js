import React, { useEffect, useState } from "react";
import { Menu, Layout } from "antd";
import {
  PushpinOutlined,
  CameraOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  UserOutlined,
  BgColorsOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";

const { SubMenu } = Menu;
const { Sider } = Layout;

const AdminNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState();
  const onlyWidth = useWindowWidth();
  useEffect(() => {
    setCurrent(window.location.pathname);
  }, []);

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true);
    } else if (onlyWidth > 800) {
      setCollapsed(false);
    }
  }, [onlyWidth < 800]);

  const activeName = (name) => `${current == name && "active"}`;
  return (
    <Sider
      style={{ width: 256 }}
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1", "sub2"]}
        mode="inline"
        theme="light"
      >
        <Menu.Item key="1" icon={<SettingOutlined />}>
          <Link href="/admin/">
            <a className={activeName("/admin/")}>Dashboard</a>
          </Link>
        </Menu.Item>

        {/* POSTS */}
        <SubMenu key="sub1" icon={<PushpinOutlined />} title="Posts">
          <Menu.Item key="2">
            <Link href="/admin/posts">
              <a className={activeName("/admin/posts")}>All Posts</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="/admin/posts/new">
              <a className={activeName("/admin/posts/new")}>Add new</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link href="/admin/categories">
              <a className={activeName("/admin/categories")}>Categories</a>
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* MEDIA */}
        <SubMenu key="sub2" icon={<CameraOutlined />} title="Media">
          <Menu.Item key="5">
            <Link href="/admin/media">
              <a className={activeName("/admin/media/library")}>Library</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link href="/admin/media/new">
              <a className={activeName("/admin/media/new")}>Add new</a>
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* COMMENTS */}
        <Menu.Item key="7" icon={<CommentOutlined />}>
          <Link href="/admin/comments">
            <a className={activeName("/admin/comments")}>Comments</a>
          </Link>
        </Menu.Item>

        {/* USERS */}
        <SubMenu key="sub3" icon={<UserSwitchOutlined />} title="Uers">
          <Menu.Item key="8">
            <Link href="/admin/users">
              <a className={activeName("/admin/users")}>All Users</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link href="/admin/users/new">
              <a className={activeName("/admin/users/new")}>Add new</a>
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* PROFILE */}
        <Menu.Item key="10" icon={<UserOutlined />}>
          <Link href="/admin/profile">
            <a className={activeName("/admin/profile")}>Profile</a>
          </Link>
        </Menu.Item>

        {/* CUSTOMIZE */}
        <Menu.Item key="11" icon={<BgColorsOutlined />}>
          <Link href="/admin/customize">
            <a className={activeName("/admin/customize")}>Customize</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminNav;
