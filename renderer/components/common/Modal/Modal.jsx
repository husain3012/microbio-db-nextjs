import React from "react";
import classes from "./Modal.module.css";
import { Modal, Button } from "antd";
import ProtectedLayout from "../../Layout/ProtectedLayout";

const ModalContainer = (props) => {
  return (
    <ProtectedLayout>
      <Modal {...props}>{props.children}</Modal>;
    </ProtectedLayout>
  );
};

export default ModalContainer;
