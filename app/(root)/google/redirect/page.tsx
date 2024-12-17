"use client";

// TODO: useAuth가 없어서 주석처리 해뒀습니다.

// import { useAuth } from "@/hooks/useAuth";
import React, { useEffect } from "react";

const Redirect = () => {
  // const { userGoogleLogin } = useAuth();

  useEffect(() => {
    // const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    // const accessToken = parsedHash.get("access_token");
    // userGoogleLogin({ idToken: accessToken! });
  }, []);
  return <div>Redirect</div>;
};

export default Redirect;
