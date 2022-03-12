import React from "react";
import { Form, Input } from "antd";
import classes from "./SearchModal.module.css";
import ModalContainer from "../common/Modal/Modal";
import { useRecoilState } from "recoil";
import { uiAtom } from "../../recoil/ui";
const NewRecord = () => {
  const [ui, setUi] = useRecoilState(uiAtom);
  const handleModalClose = () => {
    setUi((prevValue) => ({
      ...prevValue,
      isSearchModalVisible: false,
    }));
  };

  return (
    <ModalContainer visible={ui.isSearchModalVisible} onCancel={handleModalClose} title="New Record">
      <Form>
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>
      </Form>
    </ModalContainer>
  );
};

export default NewRecord;
