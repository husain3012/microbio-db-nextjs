import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../recoil/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineSetting, AiOutlineBarChart, AiOutlineUser } from "react-icons/ai";
import { DownOutlined } from "@ant-design/icons";
import { BsListOl } from "react-icons/bs";
import classes from "./Navbar.module.css";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const router = useRouter();
  const user = useRecoilValue(authAtom);
  const [selectedPath, setSelectedPath] = useState("");
  useEffect(() => {
    setSelectedPath(router.pathname.split("/")[1]);
    console.log(router.pathname.split("/")[1]);
  }, [router.pathname]);

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[selectedPath]}>
      <Menu.Item key="home" style={{ marginRight: "100px" }}>
        <Link href="/">
          <a className={classes["nav-link"]}>
            <span className={classes["nav-link-text"]}>HOME</span>
          </a>
        </Link>
      </Menu.Item>

      <Menu.Item key="records">
        <Link href="/records">
          <a className={classes["nav-link"]}>
            <span className={classes["nav-link-text"]}>
              <BsListOl />
              RECORDS
            </span>
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="stats">
        <Link href="/stats">
          <a className={classes["nav-link"]}>
            <span className={classes["nav-link-text"]}>
              <AiOutlineBarChart />
              STATS
            </span>
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="general">
        <Link href="/general">
          <a className={classes["nav-link"]}>
            <span className={classes["nav-link-text"]}>
              <AiOutlineSetting />
              GENERAL
            </span>
          </a>
        </Link>
      </Menu.Item>

      {user && (
        <Menu.Item className={classes["nav-user"]} key="login">
          <Link href="/user">
            <UserDropdown>
              <span className={classes["nav-link-text"]}>
                <AiOutlineUser />
                {user.username}
                <DownOutlined />
              </span>
            </UserDropdown>
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navbar;
