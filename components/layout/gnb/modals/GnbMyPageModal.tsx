"use client";

import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { IoCheckmark, IoPencil } from "react-icons/io5";

const GnbMyPageModal = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [nickname, setNickname] = useState("마이플리");
  const [previewUrl, setPreviewUrl] = useState("/AddImage.png");
  const [edit, setEdit] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 사진 업로드하는 로직
  // const uploadImage = async () => {
  //   if (!selectedImage) return;

  //   const formData = new FormData();
  //   formData.append('image', selectedImage);

  //   try {
  //     const response = await fetch('/api/upload-profile-image', {
  //       method: 'POST',
  //       body: formData,
  //     });
  //     if (response.ok) {
  //       // 업로드 성공 처리
  //       console.log('Image uploaded successfully');
  //     } else {
  //       // 에러 처리
  //       console.error('Failed to upload image');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };

  // 변경 사항 저장 함수 추가해야함

  const handleSave = () => {
    // text 저장하고 상태 전송하는 api 로직 추가
    // 저장 버튼 안 누르면 변경된 상태 저장 안 되도록

    setEdit(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <>
      {edit ? (
        <button
          className="absolute right-[5rem] top-[1.5rem] z-40
       text-black rounded-full hover:bg-gray p-2"
          onClick={handleSave}
        >
          <IoCheckmark className="w-5 h-5" />
        </button>
      ) : (
        <button
          className="absolute right-[5rem] top-[1.6rem] z-40
        text-black hover:bg-gray rounded-full flex-center p-2"
          onClick={() => setEdit(true)}
        >
          <IoPencil className="w-4 h-4" />
        </button>
      )}

      <div
        className="flex flex-col 
           text-black gap-10"
      >
        <div className="flex-center">
          <label
            htmlFor="profile"
            className={` w-[200px] h-[200px] 
          relative block overflow-hidden ${edit ? "cursor-pointer" : ""}`}
          >
            <Image
              src={previewUrl}
              className="rounded-full"
              fill={true}
              objectFit="cover"
              alt="프로필 추가"
            />
          </label>
          {edit && (
            <input
              onChange={handleFileChange}
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
                  className={`form-input p-1 text-lg
                      `}
                  placeholder="닉네임"
                  value={nickname}
                  autoFocus
                />
              </div>
            ) : (
              <span className="text-lg font-medium">{nickname}</span>
            )}
          </div>
          <div className="flex  gap-5 items-center">
            <span className="text-sm">이메일</span>
            <span className="text-lg font-medium">google@google.com</span>
          </div>
          <div className="w-full pt-4 ">
            <button className="text-xs items-start text-zinc-400 ">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GnbMyPageModal;
