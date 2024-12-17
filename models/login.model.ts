import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "이메일 형식을 확인해주세요" }).trim(),
  password: z.string().min(3, { message: "3글자 이상 입력해주세요" }).trim(),
});

export type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
    message?: string;
  };
};
