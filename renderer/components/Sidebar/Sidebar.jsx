import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import Link from "next/link";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider className="site-layout-background">
      <Menu mode="inline" defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} style={{ height: "100%", borderRight: 0 }}>
        <SubMenu key="sub3" icon={<NotificationOutlined />} title="General Data">
          <Menu.Item key="9">
            <Link href="/antibiotics">Antibiotics</Link>
          </Menu.Item>
          <Menu.Item key="10">Departments</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
