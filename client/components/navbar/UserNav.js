import React, { useEffect, useState } from "react";
import { Menu, Layout } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  CommentOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";

const { Sider } = Layout;

const UserNav = () => {
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
          <Link href="/user">
            <a className={activeName("/user")}>Dashboard</a>
          </Link>
        </Menu.Item>
        {/* COMMENTS */}
        <Menu.Item key="7" icon={<CommentOutlined />}>
          <Link href="/user/comments">
            <a className={activeName("/user/comments")}>My Comments</a>
          </Link>
        </Menu.Item>
        {/* PROFILE */}
        <Menu.Item key="10" icon={<UserOutlined />}>
          <Link href="/user/profile">
            <a className={activeName("/user/profile")}>My Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="11" icon={<UserAddOutlined />}>
          <Link href="/user/become-author">
            <a className={activeName("/user/become-author")}>Become Author</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default UserNav;
