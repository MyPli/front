import { z } from "zod";

export const MypageFormSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: "닉네임은 2글자 이상 , 20글자 이하여야 합니다" })
    .max(20, { message: "닉네임은 2글자 이상 , 20글자 이하여야 합니다" })
    .trim(),
  profileImage: z.string().trim(),
});

export type MypageFormState = {
  errors?: {
    nickname?: string[];
    profileImage?: string[];
    message?: string;
  };
  success?: {
    message: string;
    user: {
      id: number;
      nickname: string;
      profileImage: string | null;
    };
  };
};
