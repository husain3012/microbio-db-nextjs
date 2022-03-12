import React from "react";
import ProtectedLayout from "../../components/Layout/ProtectedLayout";
import NewRecordForm from "../../components/NewRecord/NewRecordForm";
import { Steps } from "antd";
const { Step } = Steps;
const New = () => {
  return (
    <ProtectedLayout>
      {/* <Steps current={0}>
        <Step title="Finished" description="This is a description." />
        <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
        <Step title="Waiting" description="This is a description." />
      </Steps> */}

      <NewRecordForm />
    </ProtectedLayout>
  );
};

export default New;
