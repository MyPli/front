"use client";

import { useMyPageState } from "@/hooks/useMyPageState";
import Image from "next/image";
import React, {
  ChangeEvent,
  useEffect,
  useState /*useTransition*/,
} from "react";
import { IoCheckmark, IoPencil } from "react-icons/io5";

const MyPageEditModal = () => {
  const { edit, onEdit, profile } = useMyPageState();

  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  // const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (profile && profile.success) {
      setNickname(profile.success.nickname || "");
      setEmail(profile.success.email || "");
      setPreviewImage(profile.success.profileImage || "/AddImage.png");
    }
  }, [profile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setProfileImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSave = (formData: FormData) => {
    // formData.append("nickname", nickname);
    // if (profileImageFile) {
    //   formData.append("profileImage", profileImageFile);
    // }
    // mutation.mutate(formData);
  };

  return (
    <form action={handleSave}>
      {edit ? (
        <button
          type="submit"
          className="absolute right-[5rem] top-[1.5rem] z-40 text-black rounded-full hover:bg-gray p-2"
        >
          <IoCheckmark className="w-5 h-5" />
        </button>
      ) : (
        <button
          type="button"
          className="absolute right-[5rem] top-[1.6rem] z-40 text-black hover:bg-gray rounded-full flex-center p-2"
          onClick={onEdit}
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
              name="profileImage"
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
                  name="nickname"
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
            <button type="button" className="text-xs items-start text-zinc-400">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MyPageEditModal;
