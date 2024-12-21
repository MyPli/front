"use server";

import { LoginFormSchema, LoginFormState } from "@/models/login.model";
import { api } from "@/utils/api";
import { cookies } from "next/headers";

export const login = async (
  state: LoginFormState | null,
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
    const res = await api.post("/auth/login", {
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      if (res.status === 400) {
        return {
          errors: { message: "입력형식이 잘못되었습니다" },
        };
      }
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
    return json;
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

export const logout = async () => {
  try {
    const res = await api.post("/auth/logout");
    const json = await res.json();
    await resetAuthCookies();

    return { message: json.message };
  } catch (error) {
    console.log("네트워크 에러", error);
    return {
      errors: { message: "네트워크 오류가 발생했습니다" },
    };
  }
};

export const googleLogin = async () => {
  try {
    const res = await api.get("/auth/google");

    if (!res.ok) {
      return {
        errors: { message: "api 오류." },
      };
    }

    return "성공";
  } catch (error) {
    console.log("네트워크 에러", error);
    return {
      errors: { message: "네트워크 오류가 발생했습니다" },
    };
  }
};
