import React, { useState, useEffect } from "react";
import { Table } from "antd";
import qs from "qs";
import Link from "next/link";
import _ from "lodash";

const columns = [
  {
    title: "Sample ID",
    dataIndex: "sample_id",
  },
  {
    title: "Department",
    dataIndex: "department",
    render: (text, record) => {
      return _.startCase(text);
    },
  },
  {
    title: "Consultant",
    dataIndex: "physician",
  },

  {
    title: "Sample",
    dataIndex: "specimen",
  },
  {
    title: "Progress",
    dataIndex: "progress",
  },
  {
    title: "Staphylococcus",
    dataIndex: "sensitivity",
    render: (text, record) => {
      return record.sensitivity && record.sensitivity.staphylococcusName;
    },
  },
  {
    title: "Streptococcus",
    dataIndex: "sensitivity",
    render: (text, record) => {
      return record.sensitivity && record.sensitivity.streptococcusName;
    },
  },
  {
    title: "Gram Negative",
    dataIndex: "sensitivity",
    render: (text, record) => {
      return record.sensitivity && record.sensitivity.gramNegativeName;
    },
  },
  {
    title: "Pseudomonas",
    dataIndex: "sensitivity",
    render: (text, record) => {
      return record.sensitivity && record.sensitivity.pseudomonasName;
    },
  },
  {
    title: "Details",
    dataIndex: "sample_id",
    render: (text, record) => {
      return (
        <Link href={`/reports/view/${text}`}>
          <a>View Details</a>
        </Link>
      );
    },
  },
  {
    title: "Edit",
    dataIndex: "sample_id",
    render: (text, record) => {
      return (
        <Link href={`/records/${text}`}>
        <a>Edit</a>
        </Link>
      );
    },
  },
];

const TabularView = (props) => {
  const { data, loadMoreData, totalSamples } = props;

  return <Table columns={columns} dataSource={data} />;
};

export default TabularView;
