import React, { useState, useEffect } from "react";
import { List, message, Avatar, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import RecordListCard from "../../components/RecordListCard/RecordListCard";
import ProtectedLayout from "../../components/Layout/ProtectedLayout";
const Records = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [lastFetched, setLastFetched] = useState(dateRanges());
  const [hasMore, setHasMore] = useState(true);

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
        if (resp.data.length > 0) {
          setData([...data, ...resp.data]);
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

  return (
    <ProtectedLayout>
      <div>
        <div>
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
        <div
          id="scrollableDiv"
          style={{
            height: "80vh",
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={hasMore}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item style={{ padding: "0" }} key={item.sample_id}>
                  <RecordListCard sample={item} />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
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
