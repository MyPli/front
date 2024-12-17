import { z } from "zod";

export const MypageFormSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: "닉네임은 공백일 수 없습니다" })
    .trim(),
  profileImage: z.string().trim(),
});

export type MypageFormState = {
  errors?: {
    nickname?: string;
    profileImage?: string;
    message?: string;
  };
};
