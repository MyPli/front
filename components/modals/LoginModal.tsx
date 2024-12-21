"use client";

import Image from "next/image";
import React, { useActionState, useEffect } from "react";
import FormButton from "@/components/commons/FormButton";
import { login } from "@/action/login";
import { useLoginModalStore } from "@/store/loginModalStore";
import { useSignUpModalStore } from "@/store/signUpModalStore";
import FormInput from "../commons/FormInput";
import { useAuthStore } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";

export interface LoginProps {
  email: string;
  password: string;
}

const LoginModal = () => {
  const { closeLoginModal } = useLoginModalStore();
  const { openSignUpModal } = useSignUpModalStore();
  const { storeLogin } = useAuthStore();

  const [state, action] = useActionState(login, null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state && !state.errors) {
      // 로그인 성공 시 처리
      const fetchData = async () => {
        try {
          // 플레이리스트와 북마크 데이터 fetch
          await Promise.all([
            queryClient.refetchQueries({ queryKey: ["myplaylists"] }),
            queryClient.refetchQueries({ queryKey: ["likelist"] }),
          ]);

          alert("로그인 성공");
          storeLogin();
          closeLoginModal();
        } catch (error) {
          console.error("데이터 fetch 실패:", error);
        }
      };

      fetchData();
    } else {
      console.log(state?.errors?.message);
    }
  }, [state, closeLoginModal, storeLogin, queryClient]);

  const handleClick = () => {
    closeLoginModal();
    openSignUpModal();
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google`;
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
        {state?.errors?.message && (
          <div className="text-red-500 text-sm ">{state.errors.message}</div>
        )}

        <FormInput
          placeholder="비밀번호"
          type="password"
          name="password"
          errors={state?.errors?.password}
        />
        {state?.errors?.message && (
          <div className="text-red-500 text-sm">{state.errors.message}</div>
        )}
        <FormButton size="large" color="primary">
          <span>로그인</span>
        </FormButton>
      </form>

      <div className="bg-gray w-full h-[1px]" />
      <FormButton size="large" color="white" onClick={handleGoogleLogin}>
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
