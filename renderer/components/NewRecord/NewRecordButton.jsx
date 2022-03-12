import React from "react";
import { IoMdAdd } from "react-icons/io";
import classes from "./NewRecordButton.module.css";
import Link from "next/link";
const NewRecordButton = () => {
  return (
    <Link href="/records/new">
      <button className={classes["add-btn"]}>
        <IoMdAdd />
      </button>
    </Link>
  );
};

export default NewRecordButton;
