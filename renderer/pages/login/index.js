import React, { useContext } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom } from "../../recoil/auth";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import openNotificationWith from "../../utils/notification";
import classes from "./index.module.css";
const Login = (props) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(authAtom);

  const submitHandler = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const response = await axios.post("/api/auth/login", values);
      console.log(response.data);
      if (response.status === 200) {
        openNotificationWith("success", "Login Successful", "You have successfully logged in.");
        const loggedInUser = {
          ...response.data.user,
          token: response.data.token,
        };
        setUser(loggedInUser);

        router.push("/");
      }
    } catch (error) {
      console.log(error.response.data);
      openNotificationWith("error", "Login failed", error.response.data.message);
    }
  };

  return (
    <div className={classes["form-container"]}>
      <Form
        name="normal_login"
        className={classes.form}
        initialValues={{
          remember: true,
        }}
        onFinish={submitHandler}
      >
        <h1>Authorize</h1>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
