import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/auth";
// custom hook to use api with axios auth token
export const useApi = () => {
  const user = useRecoilValue(authAtom);
  const [apiStatus, setApiStatus] = useState({
    error: false,
    loading: false,
    response: null,
  });
  

  const fetchData = async (url, method, data) => {
    setApiStatus((prevState) => ({ ...prevState, loading: true }));
    try {
      const res = await axios({
        method: method || "GET",
        url,
        data,
        params: data,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setApiStatus((prevState) => ({
        ...prevState,
        loading: false,
        response: res.data,
      }));
      return res;
    } catch (err) {
      setApiStatus((prevState) => ({
        ...prevState,
        loading: false,
        error: err,
      }));
      return err;
    }
  };

  return [apiStatus, fetchData];
};
