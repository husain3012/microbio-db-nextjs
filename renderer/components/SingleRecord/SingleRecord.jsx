import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/use-api";
import { Form, Input, Button, Checkbox, Select, Radio, Divider } from "antd";
import ProtectedLayout from "../Layout/ProtectedLayout";
import classes from "./SingleRecord.module.css";
import SensitivityPanel from "./SensitivityPanel";
const { TextArea } = Input;
const { Option } = Select;

const SingleRecord = (props) => {
  const [{ response, error, sampleLoading }, fetchApi] = useApi();
  const [{ response: antibiotics, atbLoading }, getAntibiotics] = useApi();
  const [{ response: syncResponse }, syncApi] = useApi();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(sampleLoading || atbLoading);
  }, [atbLoading, sampleLoading]);
  console.log(response);

  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    fetchApi(`/api/sample/get/${props.id}`);
    getAntibiotics("/api/antibiotic/getAll");
    // console.log(antibiotics);
  }, [props.id]);

  const [progress, setProgress] = useState("");
  useEffect(() => {
    if (!loading && response && response.data && antibiotics && antibiotics.data) {
      setProgress(response.data.progress);

      // transform and setInitialValues
      const tempInitialValues = {
        progress: response.data.progress,
        remarks: response.data.remarks,
      };
      if (response.data.progress === "growth") {
        tempInitialValues.progress = response.data.progress;

        if (response.data.sensitivity) {
          tempInitialValues.bacteriaCount = response.data.sensitivity.bacteriaCount;
          tempInitialValues.growthTime = response.data.sensitivity.growthTime;
          const { aerobic, anaerobic } = response.data.sensitivity;
          tempInitialValues.respiration = (aerobic || anaerobic )? (aerobic ? "aerobic" : "anaerobic") : "";

          // load initially saved values
          if (response.data.sensitivity.staphylococcusName) {
            tempInitialValues.staphylococcusPanel = true;
            tempInitialValues.staphylococcusName = response.data.sensitivity.staphylococcusName;
            antibiotics.data.staphylococcus.map((atb) => {
              tempInitialValues["staphylococcus@" + atb.shortName] = response.data.sensitivity.staphylococcusPanel[atb.shortName] || "r";
            });
          }
          if (response.data.sensitivity.streptococcusName) {
            tempInitialValues.streptococcusPanel = true;

            tempInitialValues.streptococcusName = response.data.sensitivity.streptococcusName;
            antibiotics.data.streptococcus.map((atb) => {
              tempInitialValues["streptococcus@" + atb.shortName] = response.data.sensitivity.streptococcusPanel[atb.shortName] || "r";
            });
          }
          if (response.data.sensitivity.gramNegativeName) {
            tempInitialValues.gramNegativePanel = true;

            tempInitialValues.gramNegativeName = response.data.sensitivity.gramNegativeName;
            antibiotics.data.gramNegative.map((atb) => {
              tempInitialValues["gramNegative@" + atb.shortName] = response.data.sensitivity.gramNegativePanel[atb.shortName] || "r";
            });
          }
          if (response.data.sensitivity.pseudomonasName) {
            tempInitialValues.pseudomonasPanel = true;

            tempInitialValues.pseudomonasName = response.data.sensitivity.pseudomonasName;
            antibiotics.data.pseudomonas.map((atb) => {
              tempInitialValues["pseudomonas@" + atb.shortName] = response.data.sensitivity.pseudomonasPanel[atb.shortName] || "r";
            });
          }
        }
      }
      // add initial values for antibiotics
      antibiotics.data.staphylococcus.forEach((atb) => {
        if (!tempInitialValues["staphylococcus@" + atb.shortName]) {
          tempInitialValues["staphylococcus@" + atb.shortName] = "r";
        }
      });
      antibiotics.data.streptococcus.forEach((atb) => {
        if (!tempInitialValues["streptococcus@" + atb.shortName]) {
          tempInitialValues["streptococcus@" + atb.shortName] = "r";
        }
      });
      antibiotics.data.gramNegative.forEach((atb) => {
        if (!tempInitialValues["gramNegative@" + atb.shortName]) {
          tempInitialValues["gramNegative@" + atb.shortName] = "r";
        }
      });
      antibiotics.data.pseudomonas.forEach((atb) => {
        if (!tempInitialValues["pseudomonas@" + atb.shortName]) {
          tempInitialValues["pseudomonas@" + atb.shortName] = "r";
        }
      });
      setInitialValues(tempInitialValues);
      console.log(tempInitialValues);
    }
  }, [response, antibiotics, loading]);

  const handleProgress = (e) => {
    setProgress(e);
  };

  const formSyncHandler = (values) => {
    console.table(values);
    const transformedValues = {
      sample_id: response.data.sample_id,
      progress: progress,
      remarks: values.remarks,
    };
    if (progress === "growth") {
      transformedValues.sensitivity = {};
      transformedValues.sensitivity.growthTime = parseFloat(values.growthTime);
      transformedValues.sensitivity.aerobic = values.respiration === "aerobic";
      transformedValues.sensitivity.anerobic = values.respiration === "anaerobic";
      transformedValues.sensitivity.bacteriaCount = parseFloat(values.bacteriaCount);
      if (values.staphylococcusPanel) {
        transformedValues.sensitivity.staphylococcusName = values.staphylococcusName;
        const panelSensitivity = {};
        antibiotics.data.staphylococcus.forEach((atb) => {
          panelSensitivity[atb.shortName] = values["staphylococcus@" + atb.shortName] || "r";
        });
        transformedValues.sensitivity.staphylococcusPanel = panelSensitivity;
      }
      if (values.streptococcusPanel) {
        transformedValues.sensitivity.streptococcusName = values.streptococcusName;
        const panelSensitivity = {};

        antibiotics.data.streptococcus.forEach((atb) => {
          panelSensitivity[atb.shortName] = values["streptococcus@" + atb.shortName] || "r";
        });
        transformedValues.sensitivity.streptococcusPanel = panelSensitivity;
      }
      if (values.gramNegativePanel) {
        transformedValues.sensitivity.gramNegativeName = values.gramNegativeName;
        const panelSensitivity = {};

        antibiotics.data.gramNegative.forEach((atb) => {
          panelSensitivity[atb.shortName] = values["gramNegative@" + atb.shortName] || "r";
        });
        transformedValues.sensitivity.gramNegativePanel = panelSensitivity;
      }
      if (values.pseudomonasPanel) {
        transformedValues.sensitivity.pseudomonasName = values.pseudomonasName;
        const panelSensitivity = {};

        antibiotics.data.pseudomonas.forEach((atb) => {
          panelSensitivity[atb.shortName] = values["pseudomonas@" + atb.shortName] || "r";
        });
        transformedValues.sensitivity.pseudomonasPanel = panelSensitivity;
      }
    }

    console.log(transformedValues);
    syncApi("/api/sample/update", "POST", transformedValues);
  };

  return (
    <ProtectedLayout>
      <div className={classes.container}>
        {initialValues && (
          <div className={classes["sample-data"]}>
            <h3>ID: {response.data.sample_id}</h3>
            <Form labelAlign="left" onFinish={formSyncHandler} name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={initialValues} autoComplete="off">
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
                  <div className={classes["panel-container"]}>
                    <SensitivityPanel initialValue={initialValues.staphylococcusPanel} panel="staphylococcus" antibiotics={antibiotics.data.staphylococcus} />
                    <SensitivityPanel initialValue={initialValues.streptococcusPanel} panel="streptococcus" antibiotics={antibiotics.data.streptococcus} />
                    <SensitivityPanel initialValue={initialValues.gramNegativePanel} panel="gramNegative" antibiotics={antibiotics.data.gramNegative} />
                    <SensitivityPanel initialValue={initialValues.pseudomonasPanel} panel="pseudomonas" antibiotics={antibiotics.data.pseudomonas} />
                  </div>
                </div>
              )}

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
