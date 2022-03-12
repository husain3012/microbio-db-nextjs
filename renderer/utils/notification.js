import { notification } from "antd";

const openNotificationWith = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

export default openNotificationWith;
