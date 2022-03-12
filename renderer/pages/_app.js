import React, { useState, useEffect } from "react";
import AppLayout from "../components/Layout/Layout";
import { RecoilRoot} from "recoil";
import "antd/dist/antd.css";
import "../assets/css/global.css";

function MyApp({ Component, pageProps }) {


  return (
    <RecoilRoot>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </RecoilRoot>
  );
}

export default MyApp;
