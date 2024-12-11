import React from "react";
import FormInput from "../../../commons/FormInput";
import FormButton from "../../../commons/FormButton";
import Image from "next/image";

interface SignInModalProps {
  onClick: () => void;
}

const GnbSignInModal = ({ onClick }: SignInModalProps) => {
  return (
    <div
      className="flex flex-col items-center 
           text-black  gap-4"
    >
      <Image src="/MyPli.png" alt="로고" width={90} height={30} />
      <h1 className="text-lg">회원가입</h1>
      <form className=" flex flex-col items-center  gap-4  w-full">
        <FormInput placeholder="이메일" type="email" required error="" />
        <FormInput placeholder="닉네임" type="text" required error="" />
        <FormInput placeholder="비밀번호" type="password" required error="" />
        <FormButton size="large" color="primary">
          <span>회원가입</span>
        </FormButton>
      </form>
      <h2>
        계정이 있으신가요?
        <span
          onClick={onClick}
          className="underline underline-offset-4 font-semibold cursor-pointer"
        >
          {" "}
          로그인 하러가기
        </span>
      </h2>
    </div>
  );
};

export default GnbSignInModal;
