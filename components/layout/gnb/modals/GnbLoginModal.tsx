import Image from "next/image";
import React from "react";
import FormInput from "@/components/commons/FormInput";
import FormButton from "@/components/commons/FormButton";
import { handleLogin } from "@/hooks/useAuth";

interface LoginModalProps {
  onClick: () => void;
}

const GnbLoginModal = ({ onClick }: LoginModalProps) => {
  return (
    <div
      className="flex flex-col items-center 
           text-black  gap-4"
    >
      <Image src="/MyPli.png" alt="로고" width={90} height={30} />
      <h1 className="text-lg">로그인 </h1>
      <form
        action={handleLogin}
        className="flex flex-col items-center  gap-4 w-full"
      >
        <FormInput
          placeholder="이메일"
          type="email"
          required
          error=""
          name="email"
        />
        <FormInput
          placeholder="비밀번호"
          type="password"
          required
          error=""
          name="password"
        />
        <FormButton size="large" color="primary">
          <span>로그인</span>
        </FormButton>
      </form>
      <div className="bg-gray w-full h-[1px]" />
      <FormButton size="large" color="white">
        <span>구글 로그인</span>
      </FormButton>
      <h2>
        계정이 없으신가요?
        <span
          onClick={onClick}
          className="underline underline-offset-4 font-semibold cursor-pointer"
        >
          {" "}
          회원가입 하러가기
        </span>
      </h2>
    </div>
  );
};

export default GnbLoginModal;
