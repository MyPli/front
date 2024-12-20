"use server";

import { MypageFormSchema, MypageFormState } from "@/models/mypage.model";
import { api } from "@/utils/api";
import { getAccessToken } from "./login";

export const getProfile = async () => {
  try {
    const res = await api.get(`/users/me`);

    if (!res.ok) {
      if (res.status === 401) {
        return { errors: { message: "Unauthorized" } };
      }
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.log("네트워크 에러", error);
    return {
      errors: { message: "네트워크 오류가 발생했습니다" },
    };
  }
};

export const patchNickname = async ({
  nickname,
}: {
  nickname: string;
}): Promise<MypageFormState> => {
  console.log(nickname);

  const body = JSON.stringify({ nickname });
  console.log(body);
  try {
    const res = await api.patch("/users/me/nickname", {
      body: JSON.stringify({ nickname }),
    });
    if (!res.ok) {
      if (res.status === 401) {
        return { errors: { message: "UnAuthorized" } };
      }
    }

    const json = await res.json();
    console.log("1", json);
    return {
      ...json,
    };
  } catch (error) {
    console.error("Network Error:", error);
    return {
      errors: { message: "네트워크 오류가 발생했습니다" },
    };
  }
};

export const patchProfileImage = async ({
  profileImage,
}: {
  profileImage: File;
}): Promise<MypageFormState> => {
  try {
    const token = await getAccessToken();
    const formData = new FormData();
    formData.append("file", profileImage);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me/profile-image`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!res.ok) {
      if (res.status === 401) {
        return { errors: { message: "UnAuthorized" } };
      }
    }

    const json = await res.json();
    console.log("파일 업로드", json);
    return {
      ...json,
    };
  } catch (error) {
    console.error("Network Error:", error);
    return {
      errors: { message: "네트워크 오류가 발생했습니다" },
    };
  }
};
