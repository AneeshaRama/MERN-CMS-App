import React, { useEffect, useState } from "react";
import { Menu, Layout } from "antd";
import {
  PushpinOutlined,
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

const AuthorNav = () => {
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
          <Link href="/author">
            <a className={activeName("/author")}>Dashboard</a>
          </Link>
        </Menu.Item>

        {/* POSTS */}
        <SubMenu key="sub1" icon={<PushpinOutlined />} title="Posts">
          <Menu.Item key="2">
            <Link href="/author/posts">
              <a className={activeName("/author/posts")}>My Posts</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="/author/posts/new">
              <a className={activeName("/author/posts/new")}>Add new</a>
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* COMMENTS */}
        <Menu.Item key="7" icon={<CommentOutlined />}>
          <Link href="/author/comments">
            <a className={activeName("/author/comments")}>My Comments</a>
          </Link>
        </Menu.Item>

        {/* PROFILE */}
        <Menu.Item key="10" icon={<UserOutlined />}>
          <Link href="/author/profile">
            <a className={activeName("/author/profile")}>My Profile</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AuthorNav;
