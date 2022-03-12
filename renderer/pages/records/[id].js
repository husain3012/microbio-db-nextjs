import React from "react";
import { useRouter } from "next/router";
import SingleRecord from "../../components/SingleRecord/SingleRecord";
const Sample = () => {
  const router = useRouter();
  const id = router.query.id;
  return (
    <div>
      <SingleRecord id={id} />
    </div>
  );
};

export default Sample;
