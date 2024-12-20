"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./GnbSearchForm";
import HambugerMenu from "./GnbHambugerMenu";
import Modal from "@/components/commons/Modal";
import { useLoginModalStore } from "@/store/loginModalStore";
import { useSignUpModalStore } from "@/store/signUpModalStore";
import { useMypageModalStore } from "@/store/myPageModalStore";
import LoginModal from "@/components/modals/LoginModal";
import SignUpModal from "@/components/modals/SignUpModal";
import MyPageModal from "@/components/modals/MyPageModal";
import { logout } from "@/action/login";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useMypageEditModalStore } from "@/store/myPageEditModalStore";
import MyPageEditModal from "@/components/modals/MyPageEditModal";

const GnbList = () => {
  const { loginModal, openLoginModal, closeLoginModal } = useLoginModalStore();
  const { signUpModal, closeSignUpModal } = useSignUpModalStore();
  const { mypageModal, openMypageModal, closeMypageModal } =
    useMypageModalStore();

  const { mypageEditModal, closeMypageEditModal } = useMypageEditModalStore();

  const { isloggedIn, storeLogout } = useAuthStore();

  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();
    if (result.errors) {
      alert(result.errors.message);
    } else {
      storeLogout();
      alert("로그아웃 되었습니다");
      router.push("/");
    }
  };

  const handleClickMypage = () => {
    if (!isloggedIn) {
      alert("로그인이 필요합니다");
      return null;
    } else {
      openMypageModal();
    }
  };

  return (
    <>
      <Modal isOpen={loginModal} onClose={closeLoginModal}>
        <LoginModal />
      </Modal>
      <Modal isOpen={signUpModal} onClose={closeSignUpModal}>
        <SignUpModal />
      </Modal>

      <Modal
        isOpen={mypageModal}
        onClose={closeMypageModal}
        title="마이 페이지"
      >
        <MyPageModal />
      </Modal>

      <Modal
        isOpen={mypageEditModal}
        onClose={closeMypageEditModal}
        title="편집"
      >
        <MyPageEditModal />
      </Modal>
      <ul
        className="pr-8 pl-6 py-5 flex items-center justify-between 
    fixed top-0 left-0 z-10 w-full bg-black"
      >
        <li className="flex flex-row gap-8 items-center">
          <HambugerMenu />
          <Link href="/">
            <Image
              src="/MyPli.png"
              alt="로고"
              width={93}
              height={30}
              style={{ height: "auto" }}
            />
          </Link>
        </li>
        <li className="w-2/6">
          <SearchBar />
        </li>
        <li className="flex flex-row gap-5">
          <button onClick={handleClickMypage}>
            <span>마이페이지</span>
          </button>
          {isloggedIn ? (
            <button onClick={handleLogout}>
              <span>로그아웃</span>
            </button>
          ) : (
            <button onClick={openLoginModal}>
              <span>로그인</span>
            </button>
          )}
        </li>
      </ul>
    </>
  );
};

export default GnbList;
