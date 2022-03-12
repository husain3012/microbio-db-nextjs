import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/auth";
const Home = () => {
  const router = useRouter();

  const user = useRecoilValue(authAtom);
  console.log(user);

  return user ? (
    <div>
      <h1>Home</h1>
      <Link href="/records">Records</Link>
    </div>
  ) : (
    <h1>404</h1>
  );
};

export default Home;
