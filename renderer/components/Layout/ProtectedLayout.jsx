import React, { useEffect } from "react";
import { authAtom } from "../../recoil/auth";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
const ProtectedLayout = (props) => {
  const router = useRouter();

  const user = useRecoilValue(authAtom);
  useEffect(() => {
    if (!user) {
      return router.push("/login");
    }
  }, [user]);

  return <>{user && props.children}</>;
};

export default ProtectedLayout;
