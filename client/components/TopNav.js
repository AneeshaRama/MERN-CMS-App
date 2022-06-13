import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
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
      >
        <Menu.Item key="mail" icon={<MailOutlined />}>
          <Link href={"/"}>
            <a>BLOGGER</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="register"
          icon={<MailOutlined />}
          style={{ marginLeft: "auto" }}
        >
          <Link href={"/register"}>
            <a>Register</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="login" icon={<MailOutlined />}>
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
