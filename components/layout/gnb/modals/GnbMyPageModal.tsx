"use client";

import { useProfileQuery, useUpdataProfileQuery } from "@/hooks/useProfile";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoCheckmark, IoPencil } from "react-icons/io5";

const GnbMyPageModal = () => {
  const { data } = useProfileQuery();
  const { mutate: updateProfile } = useUpdataProfileQuery();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState<string>("");
  const [previewImage, setPreviewImage] = useState("/AddImage.png");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (data) {
      setEmail(data.email);
      setNickname(data.nickname || "");
      setPreviewImage(data.previewImage || "/AddImage.png");
    }
  }, [data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string); // Store the Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSave = () => {
    // Send Base64 image string and nickname
    updateProfile({
      nickname,
      profileImage: previewImage, // This is the Base64 string
    });
    setEdit(false);
  };

  return (
    <>
      {edit ? (
        <button
          className="absolute right-[5rem] top-[1.5rem] z-40 text-black rounded-full hover:bg-gray p-2"
          onClick={handleSave}
        >
          <IoCheckmark className="w-5 h-5" />
        </button>
      ) : (
        <button
          className="absolute right-[5rem] top-[1.6rem] z-40 text-black hover:bg-gray rounded-full flex-center p-2"
          onClick={() => setEdit(true)}
        >
          <IoPencil className="w-4 h-4" />
        </button>
      )}

      <div className="flex flex-col text-black gap-10">
        <div className="flex-center">
          <label
            htmlFor="profile"
            className={`w-[200px] h-[200px] relative block overflow-hidden ${
              edit ? "cursor-pointer" : ""
            }`}
          >
            <Image
              src={previewImage}
              className="rounded-full"
              fill={true}
              alt="프로필 추가"
              style={{ objectFit: "cover" }}
            />
          </label>
          {edit && (
            <input
              onChange={handleImageChange}
              type="file"
              accept="image/*"
              className="hidden"
              id="profile"
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-5 items-center">
            <span className="text-sm">닉네임</span>
            {edit ? (
              <div className="flex max-w-full">
                <input
                  onChange={handleChange}
                  className="form-input py-1 px-2 text-lg"
                  placeholder="닉네임"
                  value={nickname}
                  autoFocus
                />
              </div>
            ) : (
              <span className="text-lg font-medium">{nickname}</span>
            )}
          </div>
          <div className="flex gap-5 items-center">
            <span className="text-sm">이메일</span>
            <span className="text-lg font-medium">{email}</span>
          </div>
          <div className="w-full pt-4">
            <button className="text-xs items-start text-zinc-400">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GnbMyPageModal;
