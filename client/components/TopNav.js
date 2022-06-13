import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  CloudFilled,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const TopNav = () => {
  const [current, setCurrent] = useState("mail");
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Menu
        onClick={handleClick}
        mode="horizontal"
        defaultSelectedKeys={[current]}
        theme="dark"
      >
        <Menu.Item key="mail" icon={<CloudFilled />}>
          <Link href={"/"}>
            <a>BLOGGER</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="register"
          icon={<UserAddOutlined />}
          style={{ marginLeft: "auto" }}
        >
          <Link href={"/register"}>
            <a>Register</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="login" icon={<UserOutlined />}>
          <Link href={"/login"}>
            <a>Login</a>
          </Link>
        </Menu.Item>
        <Menu.SubMenu
          key="SubMenu"
          title="Dashboard"
          icon={<SettingOutlined />}
        >
          <Menu.ItemGroup title="Management">
            <Menu.Item key="one" icon={<AppstoreOutlined />}>
              <Link href={"/admin"}>
                <a>Admin</a>
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    </>
  );
};

export default TopNav;
