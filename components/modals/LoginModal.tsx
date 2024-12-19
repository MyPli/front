"use client";

import Image from "next/image";
import React, { useActionState, useEffect } from "react";
import FormButton from "@/components/commons/FormButton";
import { googleLogin, login } from "@/action/login";
import { useLoginModalStore } from "@/store/loginModalStore";
import { useSignUpModalStore } from "@/store/signUpModalStore";
import FormInput from "../commons/FormInput";
import { useLoginButtonState } from "@/hooks/useLoginButtonState";

export interface LoginProps {
  email: string;
  password: string;
}

const LoginModal = () => {
  const { closeLoginModal } = useLoginModalStore();
  const { openSignUpModal } = useSignUpModalStore();
  const { loggedIn } = useLoginButtonState();

  const [state, action] = useActionState(login, null);

  useEffect(() => {
    if (state && !state.errors) {
      alert("로그인 성공");
      loggedIn();
      closeLoginModal();
    }
  }, [state, closeLoginModal, loggedIn]);

  const handleClick = () => {
    closeLoginModal();
    openSignUpModal();
  };

  const googleOAuth = () => {
    const baseURL = "https://accounts.google.com/o/oauth2/auth";
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY!,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      response_type: "token",
      scope:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    });

    const finalURL = `${baseURL}?${params.toString()}`;
    window.location.href = finalURL;
  };

  return (
    <div
      className="flex flex-col items-center 
           text-black  gap-4 "
    >
      <Image src="/MyPli.png" alt="로고" width={90} height={30} />
      <h1 className="text-lg">로그인 </h1>
      <form action={action} className="flex flex-col items-center gap-4 w-full">
        <FormInput
          placeholder="이메일"
          type="email"
          name="email"
          errors={state?.errors?.email}
        />
        <FormInput
          placeholder="비밀번호"
          type="password"
          name="password"
          errors={state?.errors?.password}
        />
        <FormButton size="large" color="primary">
          <span>로그인</span>
        </FormButton>
      </form>

      <div className="bg-gray w-full h-[1px]" />
      <FormButton size="large" color="white" onClick={googleLogin}>
        <span>구글 로그인</span>
      </FormButton>
      <h2>
        계정이 없으신가요?
        <span
          onClick={handleClick}
          className="underline underline-offset-4 font-semibold cursor-pointer"
        >
          {" "}
          회원가입 하러가기
        </span>
      </h2>
    </div>
  );
};

export default LoginModal;
