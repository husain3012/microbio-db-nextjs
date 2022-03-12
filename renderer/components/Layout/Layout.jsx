import React, { useContext } from "react";
import { Layout } from "antd";
const { Header, Content } = Layout;
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom } from "../../recoil/auth";
import { uiAtom } from "../../recoil/ui";

import NewRecordButton from "../NewRecord/NewRecordButton";
import SearchModal from "../SearchModal/SearchModal";
const AppLayout = (props) => {
  const user = useRecoilValue(authAtom);
  const ui = useRecoilValue(uiAtom);
  console.log(ui.isNewRecordModalVisible);

  return (
    <Layout style={{ backgroundColo: "red", minHeight: "100vh" }}>
      <Header>
        <Navbar />
      </Header>
      <Layout>
        {user && <Sidebar />}

        <Content>{props.children}</Content>
        {user && <NewRecordButton />}
        {user && <SearchModal />}
      </Layout>
    </Layout>
  );
};

export default AppLayout;
