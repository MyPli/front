import React, { useActionState, useEffect } from "react";
import Image from "next/image";
import FormButton from "../commons/FormButton";
import { useSignUpModalStore } from "@/store/signUpModalStore";
import { useLoginModalStore } from "@/store/loginModalStore";
import FormInput from "../commons/FormInput";
import { signUp } from "@/action/signUp";

export interface SignUpProps {
  nickname: string;
  email: string;
  password: string;
}

const SignUpModal = () => {
  const { closeSignUpModal } = useSignUpModalStore();
  const { openLoginModal } = useLoginModalStore();

  const [state, action, pending] = useActionState(signUp, undefined);

  useEffect(() => {
    if (state && !state.errors && state.success) {
      closeSignUpModal();
      openLoginModal();
    }
  }, [state, closeSignUpModal, openLoginModal]);

  const handleClick = () => {
    closeSignUpModal();
    openLoginModal();
  };

  return (
    <div
      className="flex flex-col items-center 
           text-black  gap-4"
    >
      <Image src="/MyPli.png" alt="로고" width={90} height={30} />
      <h1 className="text-lg">회원가입</h1>

      <form action={action} className="flex flex-col items-center gap-4 w-full">
        <FormInput
          placeholder="이메일"
          type="email"
          name="email"
          errors={state?.errors?.email}
        />

        <FormInput
          placeholder="닉네임"
          type="nickname"
          name="nickname"
          errors={state?.errors?.nickname}
        />

        <FormInput
          placeholder="비밀번호"
          type="password"
          name="password"
          errors={state?.errors?.password}
        />

        <FormButton size="large" color="primary" disabled={pending}>
          <span>회원가입</span>
        </FormButton>
      </form>
      <h2>
        계정이 있으신가요?
        <span
          onClick={handleClick}
          className="underline underline-offset-4 font-semibold cursor-pointer"
        >
          {" "}
          로그인 하러가기
        </span>
      </h2>
    </div>
  );
};

export default SignUpModal;
