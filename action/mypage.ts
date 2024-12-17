"use server";

import { MypageFormSchema } from "@/models/mypage.model";
import { api } from '@/utils/api';

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

export const patchProfile = async (formData: FormData) => {
  const validatedFields = MypageFormSchema.safeParse({
    nickname: formData.get("nickname"),
    profileImage: formData.get("profileImage"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { nickname, profileImage } = validatedFields.data;

  try {
    const res = await api.post("/users/me", {
      body: JSON.stringify({ nickname, profileImage }),
    });

    if (!res.ok) {
      if (res.status === 400) {
        return { errors: { message: " Bad Request" } };
      }

      if (res.status === 401) {
        return { errors: { message: "Unauthorized" } };
      }
    }

    const json = await res.json();

    return { success: json };
  } catch (error) {
    console.log("네트워크 에러", error);
    return {
      errors: { message: "네트워크 오류가 발생했습니다" },
    };
  }
};
