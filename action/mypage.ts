"use server";

import { MypageFormSchema, MypageFormState } from "@/models/mypage.model";
import { api } from "@/utils/api";

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
export const patchProfile = async (
  formData: FormData,
): Promise<MypageFormState> => {
  console.log(formData);
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
    // 병렬 API 요청
    const [res1, res2] = await Promise.all([
      api.patch("/users/me/nickname", {
        body: JSON.stringify({ nickname }),
      }),
      api.patch("/users/me/profile-image", {
        body: JSON.stringify({ profileImage }),
      }),
    ]);

    // 응답 상태 확인
    if (!res1.ok || !res2.ok) {
      if (res1.status === 400 || res2.status === 400) {
        return { errors: { message: "Bad Request" } };
      }

      if (res1.status === 401 || res2.status === 401) {
        return { errors: { message: "Unauthorized" } };
      }

      return { errors: { message: "알 수 없는 오류가 발생했습니다." } };
    }

    // JSON 데이터 추출
    const [json1, json2] = await Promise.all([res1.json(), res2.json()]);
    console.log(json1);
    console.log(json2);
    return { success: { ...json1 } };
  } catch (error) {
    console.error("네트워크 에러:", error);
    return {
      errors: { message: "네트워크 오류가 발생했습니다" },
    };
  }
};
