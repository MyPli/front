"use client";

import { useUserState } from "@/hooks/useUserState";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";

const MyPageEditModal = () => {
  const { profile, updateNickname, updateProfileImage, deleteUser } =
    useUserState();

  const [nickname, setNickname] = useState<string>("");
  const [previewImage, setPreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  useEffect(() => {
    setNickname(profile.nickname || "");
    setPreviewImage(profile.profileImage || "/noResult.png");
  }, [profile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
      };
      reader.onerror = () => {
        setPreviewImage("/noResult.png");
        setProfileImage(null);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirm("정말 수정하시겠습니까?")) {
      if (nickname !== profile.nickname) {
        updateNickname({ nickname });
      }
      if (profileImage && profileImage !== profile.profileImage) {
        updateProfileImage({ profileImage });
      }
    } else return;
  };

  const handleClick = () => {
    deleteUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="absolute right-[5rem] top-[1.5rem] z-40 text-black rounded-full hover:bg-gray p-2"
      >
        <IoCheckmark className="w-5 h-5" />
      </button>

      <div className="flex flex-col text-black gap-10">
        <div className="flex-center">
          <label
            htmlFor="profile"
            className={`w-[200px] h-[200px] relative block overflow-hidden 
              cursor-pointer
            `}
          >
            <Image
              src={previewImage || "/noResult.png"}
              className="rounded-full"
              fill={true}
              alt="프로필 추가"
              style={{ objectFit: "cover" }}
            />
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            accept="image/*"
            className="hidden"
            id="profile"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-5 items-center">
            <span className="text-sm">닉네임</span>

            <div className="flex max-w-full">
              <input
                onChange={handleChange}
                className="form-input py-1 px-2 text-lg"
                placeholder="닉네임"
                value={nickname}
                name="nickname"
                autoFocus
              />
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <span className="text-sm">이메일</span>
            <span className="text-lg font-medium">{profile.email}</span>
          </div>
          <div className="w-full pt-4">
            <button
              onClick={handleClick}
              type="button"
              className="text-xs items-start text-zinc-400"
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MyPageEditModal;
