import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { Form, Input, Button, Checkbox, Select, Radio, Divider } from "antd";
import ProtectedLayout from "../Layout/ProtectedLayout";
import classes from "./SingleRecord.module.css";
const { TextArea } = Input;

const SingleRecord = (props) => {
  const [{ response, error, loading }, fetchApi] = useApi();
  const [staphylococcusPanel, setStaphylococcusPanel] = useState(false);
  const [streptococcusPanel, setStreptococcusPanel] = useState(false);
  const [gramNegativePanel, setGramNegativePanel] = useState(false);
  const [pseudomonasPanel, setPseudomonasPanel] = useState(false);
  const [{ response: antibiotics }, getAntibiotics] = useApi();

  const [initialValues, setInitialValues] = useState({});

  console.log(response, error, loading);

  useEffect(() => {
    fetchApi(`/api/sample/get/${props.id}`);
    getAntibiotics("/api/antibiotic/getAll");
    console.log(antibiotics);
  }, [props.id]);

  const [progress, setProgress] = useState("");
  useEffect(() => {
    if (response && response.data) {
      setProgress(response.data.progress);
      const tempInitialValues = {
        progress: response.data.progress,
        growthTime: response.data.sensitivity && response.data.sensitivity.growthTime,
      };
    }
  }, [response]);

  const handleProgress = (e) => {
    setProgress(e);
  };

  const formSyncHandler = (values) => {
    console.log(values);
  };

  return (
    <ProtectedLayout>
      <div className={classes.container}>
        {!loading && response && response.data && (
          <div className={classes["sample-data"]}>
            <h3>ID: {response.data.sample_id}</h3>
            <Form labelAlign="left" onFinish={formSyncHandler} name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{}} autoComplete="off">
              <Form.Item name="progress" label="Progress" rules={[{ required: true }]}>
                <Select placeholder="Select Progress" onChange={handleProgress}>
                  <Option value="sterile">Sterile</Option>
                  <Option value="contaminated">Contaminated</Option>
                  <Option value="growth">Growth</Option>
                </Select>
              </Form.Item>
              {progress === "contaminated" && (
                <Form.Item name="remarks" label="Remarks">
                  <TextArea rows={4} />
                </Form.Item>
              )}
              {progress === "growth" && (
                <div>
                  <div>
                    <Form.Item name="growthTime" label="Growth Time">
                      <Input type="number" />
                    </Form.Item>
                    <Form.Item name="respiration" label="Respiration">
                      <Radio.Group>
                        <Radio.Button value="aerobic">Aerobic</Radio.Button>
                        <Radio.Button value="anaerobic">Anaerobic</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item name="bacteriaCount" label="Bacteria Count">
                      <Input type="number" />
                    </Form.Item>
                  </div>
                  <Divider />
                  <div>
                    <Form.Item name="staphylococcusPanel" valuePropName="checked" label="Staphylococcus Panel">
                      <Checkbox onChange={(e) => setStaphylococcusPanel(e.target.checked)} />
                    </Form.Item>
                    {staphylococcusPanel && (
                      <div className={classes["sensitivities-selector"]}>
                        {antibiotics &&
                          antibiotics.data &&
                          antibiotics.data.staphylococcus.map((bacteria) => (
                            <Form.Item key={bacteria.id} tooltip={bacteria.name} name={"staphylococcus@" + bacteria.shortName} label={bacteria.shortName}>
                              <Radio.Group>
                                <div style={{ width: "150px" }}>
                                  <Radio.Button value="s">S</Radio.Button>
                                  <Radio.Button value="i">I</Radio.Button>
                                  <Radio.Button value="r">R</Radio.Button>
                                </div>
                              </Radio.Group>
                            </Form.Item>
                          ))}
                      </div>
                    )}
                    <Divider />

                    <Form.Item name="streptococcusPanel" valuePropName="checked" label="Streptococcus Panel">
                      <Checkbox onChange={(e) => setStreptococcusPanel(e.target.checked)} />
                    </Form.Item>
                    {streptococcusPanel && (
                      <div className={classes["sensitivities-selector"]}>
                        {antibiotics &&
                          antibiotics.data &&
                          antibiotics.data.streptococcus.map((bacteria) => (
                            <Form.Item key={bacteria.id} tooltip={bacteria.name} name={"streptococcus@" + bacteria.shortName} label={bacteria.shortName}>
                              <Radio.Group>
                                <div style={{ width: "150px" }}>
                                  <Radio.Button value="s">S</Radio.Button>
                                  <Radio.Button value="i">I</Radio.Button>
                                  <Radio.Button value="r">R</Radio.Button>
                                </div>
                              </Radio.Group>
                            </Form.Item>
                          ))}
                      </div>
                    )}
                    <Divider />

                    <Form.Item name="gramNegativePanel" valuePropName="checked" label="Gram Negative Panel">
                      <Checkbox onChange={(e) => setGramNegativePanel(e.target.checked)} />
                    </Form.Item>
                    {gramNegativePanel && (
                      <div className={classes["sensitivities-selector"]}>
                        {antibiotics &&
                          antibiotics.data &&
                          antibiotics.data.gramNegative.map((bacteria) => (
                            <Form.Item key={bacteria.id} tooltip={bacteria.name} name={"gramNegative@" + bacteria.shortName} label={bacteria.shortName}>
                              <Radio.Group>
                                <div style={{ width: "150px" }}>
                                  <Radio.Button value="s">S</Radio.Button>
                                  <Radio.Button value="i">I</Radio.Button>
                                  <Radio.Button value="r">R</Radio.Button>
                                </div>
                              </Radio.Group>
                            </Form.Item>
                          ))}
                      </div>
                    )}
                    <Divider />

                    <Form.Item name="pseudomonasPanel" valuePropName="checked" label="Pseudomonas Panel">
                      <Checkbox onChange={(e) => setPseudomonasPanel(e.target.checked)} />
                    </Form.Item>
                    {pseudomonasPanel && (
                      <div className={classes["sensitivities-selector"]}>
                        {antibiotics &&
                          antibiotics.data &&
                          antibiotics.data.pseudomonas.map((bacteria) => (
                            <Form.Item tooltip={bacteria.name} name={"pseudomonas@" + bacteria.shortName} label={bacteria.shortName}>
                              <Radio.Group>
                                <div style={{ width: "150px" }}>
                                  <Radio.Button value="s">S</Radio.Button>
                                  <Radio.Button value="i">I</Radio.Button>
                                  <Radio.Button value="r">R</Radio.Button>
                                </div>
                              </Radio.Group>
                            </Form.Item>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <Divider />

              <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Sync Changes
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
};

export default SingleRecord;
