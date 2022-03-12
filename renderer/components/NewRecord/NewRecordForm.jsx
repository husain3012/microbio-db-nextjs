import React, { useEffect, useState } from "react";
import { Form, Button, Input, Radio, Checkbox, Select, DatePicker, Steps } from "antd";
import { useApi } from "../../hooks/use-api";
import ProtectedLayout from "../Layout/ProtectedLayout";
import classes from "./NewRecordForm.module.css";
import openNotificationWith from "../../utils/notification";
import { useRouter } from "next/router";
const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

const NewRecordForm = (props) => {
  const router = useRouter();
  const [showSpecimenInput, setShowSpecimenInput] = useState(false);
  const [postApi, sendData] = useApi();
  console.log(postApi);
  useEffect(() => {
    if (postApi.error) {
      openNotificationWith("error", "New Record", "Error creating record");
    }
  }, [postApi]);

  const onChangeSpecimen = (value) => {
    if (value === "other") {
      setShowSpecimenInput(true);
    } else {
      setShowSpecimenInput(false);
    }
  };

  const formFinishHandler = async (values) => {
    const transformedValues = {
      sample_id: values.sample_id,
      patientName: values.patientName,
      age: values.age,
      sex: values.sex,
      specimen: values.specimen === "other" ? values.specimenOther : values.specimen,
      sampleDate: values.sampleDate,
      department: values.department,
      physician: values.physician,
      examRequired: values.examRequired,
    };

    console.log(transformedValues);
    const resp = await sendData("/api/sample/create", "POST", transformedValues);
    console.log(resp);
    if (resp.status === 201) {
      openNotificationWith("success", "New Record", "Record created successfully");
      setTimeout(() => {
        router.push(`/records/${resp.data.data.sample_id}`);
      }, 300);
    }
  };
  return (
    <ProtectedLayout>
      <div className={classes["form-container"]}>
        <div className={classes["form-header"]}>
          <h1>New Record</h1>
        </div>
        <Form
          onFinish={(values) => {
            formFinishHandler(values);
          }}
          className={classes["new-record-form"]}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          initialValues={{
            specimen: "urine",
            specimenOther: "",
          }}
        >
          <Form.Item label="Sample ID" name="sample_id" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Patient Name" name="patientName" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Age" name="age" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Sex" name="sex">
            <Radio.Group size="large">
              <Radio.Button value="m">Male</Radio.Button>
              <Radio.Button value="f">Female</Radio.Button>
              <Radio.Button value="o">Other</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="specimen" label="Specimen">
            <Select defaultValue="" style={{ width: 120 }} onChange={onChangeSpecimen}>
              <Option value="urine">Urine</Option>
              <Option value="puss">Puss</Option>
              <Option value="blood">Blood</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          {showSpecimenInput && (
            <Form.Item name="specimenOther" label="Add Specimen">
              <Input />
            </Form.Item>
          )}

          <Form.Item label="Date" name="sampleDate" rules={[{ required: true, message: "Please input your password!" }]}>
            <DatePicker showTime />
          </Form.Item>

          <Form.Item name="department" label="Department">
            <Select defaultValue="" style={{ width: 120 }}>
              <Option value="microbiology">microbiology</Option>
              <Option value="pathology">pathology</Option>
              <Option value="forensicMedicine">forensicMedicine</Option>
              <Option value="neuroSurgey">neuroSurgey</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Physician/Surgeon" name="physician" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="examRequired" label="Exam required">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ProtectedLayout>
  );
};

export default NewRecordForm;
