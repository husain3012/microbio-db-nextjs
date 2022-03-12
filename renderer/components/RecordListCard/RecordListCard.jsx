import React from "react";
import QRCode from "qrcode.react";
import moment from "moment";
import classes from "./RecordListCard.module.css";
import Link from "next/link";
const RecordListCard = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes["left-section"]}>
        <div className={classes["barcode-container"]}>
          <QRCode bgColor="transparent" size={100} level="H" value={props.sample.sample_id} />
        </div>
      </div>
      <div className={classes["middle-section"]}>
        <div className={classes["details"]}>
          <p>
            <span>Name: </span>
            {props.sample.patientName}
          </p>
          <p>
            <span>Sample ID: </span>
            {props.sample.id}
          </p>
          {props.sample.cadsNumber && (
            <p>
              <span>Cads Number: </span>
              {props.sample.cadsNumber}
            </p>
          )}

          <p>
            <span>Age: </span>
            {props.sample.age}
          </p>
        </div>
      </div>
      <div className={classes["right-section"]}>
        <Link href={`/records/${props.sample.sample_id}`}>
          <a >
            <button className={classes["view-btn"]}>View</button>
          </a>
        </Link>
        <h3>{props.sample.progress}</h3>
      </div>
    </div>
  );
};

export default RecordListCard;
