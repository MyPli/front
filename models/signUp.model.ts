import { z } from "zod";

export const SignUpFormSchema = z.object({
  email: z.string().email({ message: "이메일 형식을 확인해주세요" }).trim(),
  password: z.string().min(6, { message: "6글자 이상 입력해주세요" }).trim(),
  nickname: z
    .string()
    .min(2, { message: "2~20자 닉네임을 입력해주세요" })
    .max(20, { message: "2~20자 닉네임을 입력해주세요" })
    .trim(),
});

export type SignUpFormState = {
  errors?: {
    email?: string[];
    password?: string[];
    nickname?: string[];
    message?: string;
  };
  success?: {
    message: string;
  };
};
