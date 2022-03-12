import React from "react";
import { Menu, Dropdown } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { DownOutlined } from "@ant-design/icons";
import classes from "./UserDropdown.module.css";
import Link from "next/link";
const menu = (
  <ul className={classes["menu-list"]}>
    <li className={classes["menu-list-item"]}>
      <Link href="/">
        1st menu item
      </Link>
    </li>

    <li className={`${classes["menu-list-item"]} ${classes.logout}`}>Logout</li>
  </ul>
);

const UserDropdown = (props) => {
  return (
    <Dropdown overlay={menu}>
      <a onClick={(e) => e.preventDefault()}>{props.children}</a>
    </Dropdown>
  );
};

export default UserDropdown;
