import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Select, Radio, Divider } from "antd";
import classes from "./SensitivityPanel.module.css";
const SensitivityPanel = (props) => {
  const { antibiotics, panel, initialValue } = props;
  const [showPanel, setShowPanel] = useState(initialValue);
  const panelChangeHandler = (e) => {
    setShowPanel((p) => !p);
  };

  return (
    <div className={classes.panel}>
      <div className={classes["panel-input"]}>
        <Form.Item name={panel + "Panel"} valuePropName="checked">
          <Checkbox  onClick={panelChangeHandler}>
            {panel}
          </Checkbox>
        </Form.Item>
      </div>
      {showPanel && (
        <div className={classes["sensitivities-selector"]}>
          <Form.Item name={panel + "Name"} label="Bacteria" rules={[{ required: true, message: "Enter Bacteria Name" }]}>
            <Input type="text" />
          </Form.Item>

          {antibiotics &&
            antibiotics.map((bacteria) => (
              <Form.Item key={bacteria.id} tooltip={bacteria.name} name={panel + "@" + bacteria.shortName} label={bacteria.shortName}>
                <Radio.Group >
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
  );
};

export default SensitivityPanel;
