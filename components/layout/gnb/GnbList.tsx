"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SearchBar from "./GnbSearchForm";
import HambugerMenu from "./GnbHambugerMenu";
import Modal from "@/components/commons/Modal";
import GnbLoginModal from "@/components/layout/gnb/modals/GnbLoginModal";
import GnbSignInModal from "@/components/layout/gnb/modals/GnbSignInModal";
import GnbMyPageModal from "@/components/layout/gnb/modals/GnbMyPageModal";

const GnbList = () => {
  const [openMyPage, setOpenMyPage] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [switchModal, setSwitchModal] = useState(false);

  const onClose = () => {
    setOpenLogin(false);
    setSwitchModal(false);
  };

  return (
    <>
      <Modal isOpen={openLogin} onClose={onClose}>
        {switchModal ? (
          <GnbSignInModal onClick={() => setSwitchModal(false)} />
        ) : (
          <GnbLoginModal onClick={() => setSwitchModal(true)} />
        )}
      </Modal>

      <Modal
        isOpen={openMyPage}
        onClose={() => setOpenMyPage(false)}
        title="마이 페이지"
      >
        <GnbMyPageModal />
      </Modal>
      <ul
        className="pr-8 pl-6 py-5 flex items-center justify-between 
    fixed top-0 left-0 z-10 w-full"
      >
        <li className="flex flex-row gap-8 items-center">
          <HambugerMenu />
          <Link href="/">
            <Image src="/MyPli.png" alt="로고" width={93} height={30} />
          </Link>
        </li>
        <li className="w-2/6">
          <SearchBar />
        </li>
        <li className="flex flex-row gap-5">
          <button onClick={() => setOpenMyPage(true)}>
            <span>마이페이지</span>
          </button>
          <button onClick={() => setOpenLogin(true)}>
            <span>로그인</span>
          </button>
        </li>
      </ul>
    </>
  );
};

export default GnbList;
