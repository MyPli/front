"use server";

import { api } from "@/utils/api";
import { resetAuthCookies } from "./login";

export const deleteUser = async () => {
  try {
    const response = await api.delete("/users/me");

    if (response.status === 401) {
      console.log("유효하지 않거나 만료된 토큰입니다");
    }

    // await resetAuthCookies();
    const json = await response.json();
    console.log(json);

    return json;
  } catch (error) {
    console.log("네트워크 에러");
  }
};
