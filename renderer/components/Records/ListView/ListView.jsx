import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { List , Skeleton, Divider } from "antd";
import RecordListCard from '../../RecordListCard/RecordListCard';

const ListView = (props) => {
    const {data, loadMoreData, totalSamples} = props;
  return (
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
      hasMore={data.length < totalSamples}
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
  )
}

export default ListView