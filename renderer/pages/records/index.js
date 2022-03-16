import React, { useState, useEffect } from "react";
import { List, message, Avatar, Skeleton, Divider, Switch } from "antd";
import axios from "axios";
import ProtectedLayout from "../../components/Layout/ProtectedLayout";
import ListView from "../../components/Records/ListView/ListView";
import TabularView from "../../components/Records/TabularView/TabularView";
const Records = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [lastFetched, setLastFetched] = useState(dateRanges());
  const [totalSamples, setTotalSamples] = useState(true);
  const [tableView, setTableView] = useState(true);

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const resp = await axios.get("/api/sample/getByDate", {
        params: {
          startDate: lastFetched.startDate,
          endDate: lastFetched.endDate,
        },
      });
      console.log(resp.data);

      if (resp.status === 200 && resp.data) {
        if (resp.data.totalSamples > 0) {
          setData([...data, ...resp.data.foundSamples]);
          setTotalSamples(resp.data.totalSamples);
          setLastFetched((last) => {
            return dateRanges(last.startDate);
          });
        } else {
          setHasMore(false);
        }
      }

      setLoading(false);
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const toggleViewHandler = (e) => {
    setTableView(e);
  };

  return (
    <ProtectedLayout>
      <div>
        <div style={{ padding: "20px 0" }}>
          <h2 style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "auto", width: "200px" }}>
            Tabular View: <Switch onChange={toggleViewHandler} checkedChildren="On" unCheckedChildren="Off" defaultChecked />
          </h2>
          <h3>
            <b>Records</b>
            {data.length > 0 && (
              <span>
                <Divider type="vertical" />
                <span>
                  <b>{data.length}</b>
                  <span> records loaded</span>
                </span>
              </span>
            )}
          </h3>
        </div>
        {
          tableView ? <TabularView data={data} loadMoreData={loadMoreData} totalSamples={totalSamples} /> : <ListView data={data} loadMoreData={loadMoreData} totalSamples={totalSamples} />
        }
        
      </div>
    </ProtectedLayout>
  );
};

export default Records;

const dateRanges = (d) => {
  const date = d ? new Date(d) : new Date();
  const startDate = new Date(date);

  startDate.setMonth(startDate.getMonth() - 1);

  return {
    startDate: startDate.toISOString(),
    endDate: date.toISOString(),
  };
};
