"use client";

import Image from "next/image";
import React from "react";
import FormButton from "@/components/commons/FormButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGnbModalStore } from "@/store/gnbModalStore";
import { useAuth } from "@/hooks/useAuth";

export interface LoginProps {
  email: string;
  password: string;
}

const GnbLoginModal = () => {
  const { closeLoginModal, openSignUpModal } = useGnbModalStore();
  const { userLogin } = useAuth();

  const handleClick = () => {
    closeLoginModal();
    openSignUpModal();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    userLogin(data);
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 w-full"
      >
        <input
          placeholder="이메일"
          type="email"
          className="form-input"
          {...(register("email"), { required: true })}
        />
        {errors.email && (
          <span className="error-text">이메일을 확인해주세요</span>
        )}
        <input
          className="form-input"
          placeholder="비밀번호"
          type="password"
          {...(register("password"), { required: true })}
        />
        {errors.email && (
          <span className="error-text">비밀번호를 확인해주세요</span>
        )}

        <FormButton size="large" color="primary">
          <span>로그인</span>
        </FormButton>
      </form>

      <div className="bg-gray w-full h-[1px]" />
      <FormButton size="large" color="white" onClick={googleOAuth}>
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

export default GnbLoginModal;
