"use server";

import { SignUpFormSchema, SignUpFormState } from "@/models/signUp.model";
import { api } from "@/utils/api";

export const signUp = async (
  state: SignUpFormState | null,
  formData: FormData,
): Promise<SignUpFormState> => {
  const validatedFields = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    nickname: formData.get("nickname"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, nickname } = validatedFields.data;

  try {
    const res = await api.post("/auth/signup", {
      body: JSON.stringify({ email, password, nickname }),
    });

    if (!res.ok) {
      if (res.status === 400) {
        return {
          errors: { message: "데이터를 확인해주세요" },
        };
      } else if (res.status === 409) {
        return {
          errors: { email: ["이미 가입된 이메일입니다"] },
        };
      }
    }

    const json = await res.json();
    return json.message;
  } catch (error) {
    console.log("네트워크 에러", error);
    return {
      errors: { message: "네트워크 오류가 발생했습니다" },
    };
  }
};
