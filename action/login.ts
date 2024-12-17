"use server";

import { LoginFormSchema, LoginFormState } from "@/models/login.model";
import { cookies } from "next/headers";

export const login = async (
  state: LoginFormState | undefined,
  formData: FormData,
): Promise<LoginFormState> => {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      if (res.status === 401) {
        return {
          errors: { message: "잘못된 이메일 혹은 비밀번호입니다." },
        };
      }
    }

    const json = await res.json();
    const cookieStore = await cookies();
    cookieStore.set("accessToken", json.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 60 minutes
      path: "/",
    });

    cookieStore.set("refreshToken", json.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });
    return { errors: {} };
  } catch (error) {
    console.log("네트워크 에러", error);
    return {
      errors: { message: "네트워크 오류가 발생했습니다" },
    };
  }
};

export const resetAuthCookies = async () => {
  (await cookies()).set("accessToken", "");
  (await cookies()).set("refreshToken", "");
};

const getCookieValue = async (key: string) => {
  return (await cookies()).get(key)?.value;
};

export const getAccessToken = async () => {
  return getCookieValue("accessToken");
};

export const getRefreshToken = async () => {
  return getCookieValue("refreshToken");
};
