import React, { useEffect } from "react";
import ProtectedLayout from "../../components/Layout/ProtectedLayout";
import { Form, Button, Input, Radio, Checkbox, Select, Divider, Table, Collapse } from "antd";
import { useApi } from "../../hooks/use-api";
import openNotificationWith from "../../utils/notification";
import { AiFillDelete } from "react-icons/ai";
const { Option } = Select;
const { Panel } = Collapse;
import classes from "./index.module.css";
const Antibiotics = () => {
  const [postApi, sendData] = useApi();
  const [getApi, getData] = useApi();
  const [form] = Form.useForm();

  useEffect(() => {
    getData("/api/antibiotic/getAll");
  }, [postApi]);

  if (getApi.response) {
    console.log(getApi.response.data);
  }

  const submitHandler = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const response = await sendData("/api/antibiotic/create", "POST", values);
      console.log(response);
      if (response.status === 201) {
        openNotificationWith("success", "New Antibiotic", "Antibiotic created successfully");
        form.resetFields();
      } else {
        openNotificationWith("error", "New Antibiotic", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAntibioticHandler = async (id) => {
    console.log(id);
    try {
      const response = await sendData(`/api/antibiotic/delete/${id}`, "DELETE");
      console.log(response);
      if (response.status === 200) {
        openNotificationWith("success", "Antibiotic", "Antibiotic deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Abbreviation",
      dataIndex: "shortName",
      key: "shortName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Delete",
      dataIndex: "id",
      key: "id",

      render: (id) => (
        <span className={classes.delete} onClick={() => deleteAntibioticHandler(id)}>
          <AiFillDelete />
        </span>
      ),
    },
  ];

  return (
    <ProtectedLayout>
      <div className={classes.main}>
        <h3>Add New Antibiotic</h3>
        <Form labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className={classes.form} name="new_antibiotic" form={form} onFinish={submitHandler}>
          <Form.Item
            label="Antibiotic Name"
            name="name"
            rules={[{
              required: true,
              message: "Please input the antibiotic name!",
            }]}
          >
            <Input placeholder="Penicillin" />
          </Form.Item>
          <Form.Item
            label="Abbreviation"
            name="shortName"
            rules={[{
              required: true,
              message: "Please input the abbreviation of the antibiotic",
            }]}
          >
            <Input placeholder="Pnc" />
          </Form.Item>
          <Form.Item
            name="panel"
            label="Specimen"
            rules={[{
              required: true,
              message: "Please select the panel",
            }]}
          >
            <Select style={{ width: 120 }}>
              <Option value="staphylococcus">Staphylococcus</Option>
              <Option value="streptococcus">Streptococcus</Option>
              <Option value="gramNegative">Gram Negative</Option>
              <Option value="pseudomonas">Pseudomonas</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <h2>Antibiotics</h2>
        {getApi.response && (
          <>
            <div className={classes.antibiotics}>
              <div className={classes["table-container"]}>
                <h3>Staphylococcus</h3>
                <Table pagination={false} columns={tableColumns} dataSource={getApi.response.data ? getApi.response.data.staphylococcus : []} />
              </div>

              <div className={classes["table-container"]}>
                <h3>Streptococcus</h3>
                <Table pagination={false} columns={tableColumns} dataSource={getApi.response.data ? getApi.response.data.streptococcus : []} />
              </div>
              <div className={classes["table-container"]}>
                <h3>Gram Negative </h3>
                <Table pagination={false} columns={tableColumns} dataSource={getApi.response.data ? getApi.response.data.gramNegative : []} />
              </div>
              <div className={classes["table-container"]}>
                <h3>Pseudomonas</h3>
                <Table pagination={false} columns={tableColumns} dataSource={getApi.response.data ? getApi.response.data.pseudomonas : []} />
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedLayout>
  );
};

export default Antibiotics;
