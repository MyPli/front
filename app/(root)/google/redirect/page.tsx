"use client";

import React, { useEffect } from "react";

const Redirect = () => {
  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("access_token");
    console.log(accessToken);
  }, []);
  return <div>Redirect</div>;
};

export default Redirect;
