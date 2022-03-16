import React, { useEffect } from "react";
import classes from "./VIewReport.module.css";
import { useRouter } from "next/router";
import { useApi } from "../../../hooks/use-api";
import dayjs from "dayjs";

const ViewReport = () => {
  const router = useRouter();
  const id = router.query.id;
  const [{ response, error, loading }, fetchApi] = useApi();
  const data = response && response.data;

  useEffect(() => {
    fetchApi(`/api/sample/get/${id}`);
  }, [id]);

  console.log(data);

  return (
    <div>
      {!loading && data && (
        <div className={classes.container}>
          <div className={classes["header"]}>
            <div className={classes["report-title"]}>Department of Microbiology</div>
            <div className={classes["report-id"]}>
              ID: <strong>{data.id}</strong>
            </div>
          </div>
          <div className={classes["sample-details"]}>
            <div className={classes["detail-item"]}>
              <div className={classes["detail-label"]}>NAME</div>
              <div className={classes["detail-value"]}>{data.patientName}</div>
            </div>
            <div className={classes["detail-item"]}>
              <div className={classes["detail-label"]}>AGE</div>
              <div className={classes["detail-value"]}>{data.age}</div>
            </div>
            <div className={classes["detail-item"]}>
              <div className={classes["detail-label"]}>SEX</div>
              <div className={classes["detail-value"]}>{data.sex}</div>
            </div>
            <div className={classes["detail-item"]}>
              <div className={classes["detail-label"]}>SURGEON/PHYSICIAN</div>
              <div className={classes["detail-value"]}>{data.physician}</div>
            </div>
            <div className={classes["detail-item"]}>
              <div className={classes["detail-label"]}>DEPARTMENT</div>
              <div className={classes["detail-value"]}>{data.department}</div>
            </div>
            <div className={classes["detail-item"]}>
              <div className={classes["detail-label"]}>SPECIMEN</div>
              <div className={classes["detail-value"]}>{data.specimen}</div>
            </div>
            <div className={classes["detail-item"]}>
              <div className={classes["detail-label"]}>WARD/ODP</div>
              <div className={classes["detail-value"]}></div>
            </div>
            <div className={classes["detail-item"]}>
              <div className={classes["detail-label"]}>SPECIMEN RECEIVED ON</div>
              <div className={classes["detail-value"]}>{dayjs(data.sampleDate).format("DD MMM YYYY, HH:mm")}</div>
            </div>
            <div className={classes["detail-item"]}>
              <div className={classes["detail-label"]}>REPORT DATE</div>
              <div className={classes["detail-value"]}>{dayjs(data.createdAt).format("DD MMM YYYY, HH:mm")}</div>
            </div>
          </div>
          <div className={classes["report-details"]}></div>
          <div className={classes["sensitivity-details"]}></div>
        </div>
      )}
    </div>
  );
};

export default ViewReport;
