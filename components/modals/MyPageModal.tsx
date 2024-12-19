"use client";

import { useMyPageState } from "@/hooks/useMyPageState";
import { useAuthStore } from "@/store/authStore";
import { useMypageEditModalStore } from "@/store/myPageEditModalStore";
import Image from "next/image";
import React, { useEffect } from "react";
import { IoPencil } from "react-icons/io5";

const MyPageModal = () => {
  const { openMypageEditModal } = useMypageEditModalStore();
  const { profile } = useMyPageState();

  const { isloggedIn } = useAuthStore();

  useEffect(() => {
    if (!isloggedIn) {
      alert("로그인이 필요합니다");
    }
  }, []);

  if (!isloggedIn) {
    alert("로그인이 필요합니다");
    return null;
  }

  return (
    <div>
      <button
        type="button"
        className="absolute right-[5rem] top-[1.6rem] z-40 text-black hover:bg-gray rounded-full flex-center p-2"
        onClick={openMypageEditModal}
      >
        <IoPencil className="w-4 h-4" />
      </button>

      <div className="flex flex-col text-black gap-10">
        <div className="flex-center">
          <div
            className={`w-[200px] h-[200px] relative block overflow-hidden 
              cursor-pointer
            `}
          >
            <Image
              src={profile?.previewImage || "/noResult.png"}
              className="rounded-full"
              fill={true}
              sizes="200px"
              alt="프로필 추가"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-5 items-center">
            <span className="text-sm">닉네임</span>

            <span className="text-lg font-medium">{profile?.nickname}</span>
          </div>
          <div className="flex gap-5 items-center">
            <span className="text-sm">이메일</span>
            <span className="text-lg font-medium">{profile?.email}</span>
          </div>
          <div className="w-full pt-4">
            <button type="button" className="text-xs items-start text-zinc-400">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageModal;
