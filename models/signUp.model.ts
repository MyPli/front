import { z } from "zod";

export const SignUpFormSchema = z.object({
  email: z.string().email({ message: "이메일 형식을 확인해주세요" }).trim(),
  password: z.string().min(3, { message: "3글자 이상 입력해주세요" }).trim(),
  nickname: z.string().min(1, { message: "닉네임을 입력해주세요" }).trim(),
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
