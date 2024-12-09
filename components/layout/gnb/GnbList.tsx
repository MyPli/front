"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SearchBar from "./GnbSearchForm";
import HambugerMenu from "./GnbHambugerMenu";
import Modal from "@/components/commons/Modal";

const GnbList = () => {
  const [openMyPage, setOpenMyPage] = useState(false);
  const [openLogin, setOpenLogin] = useState(true);

  const handleGoogleLogin = () => {};
  return (
    <>
      <Modal isOpen={openLogin} onClose={() => setOpenLogin(false)}>
        <div
          className="flex flex-col items-center 
           text-black gap-14
        "
        >
          <div
            className="
            w-full h-full
            flex flex-col items-center text-center 
            gap-2 text-lg
          "
          >
            <Image src="/MyPli.png" alt="로고" width={160} height={60} />
            <h1 className="text-lg">마이플리에 로그인하기</h1>
          </div>

          <button
            className="flex items-center
          font-lg py-2 px-4
          border rounded-lg
          border-solid border-black w-full gap-16 "
          >
            <svg
              fill="none"
              height="32px"
              viewBox="0 0 32 32"
              width="32px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m32 0h-32v32h32z" fill="#fff" />
              <g clipRule="evenodd" fillRule="evenodd">
                <path
                  d="m23.8299 16.1818c0-.5672-.0509-1.1127-.1454-1.6363h-7.5346v3.0945h4.3055c-.1855 1-.7491 1.8473-1.5964 2.4146v2.0073h2.5855c1.5127-1.3928 2.3854-3.4437 2.3854-5.8801z"
                  fill="#4285f4"
                />
                <path
                  d="m16.1496 24c2.16 0 3.9709-.7164 5.2946-1.9382l-2.5855-2.0073c-.7164.48-1.6327.7636-2.7091.7636-2.0836 0-3.8473-1.4072-4.4764-3.2981h-2.67271v2.0727c1.31641 2.6145 4.02181 4.4073 7.14911 4.4073z"
                  fill="#34a853"
                />
                <path
                  d="m11.6735 17.52c-.16-.48-.2509-.9928-.2509-1.52 0-.5273.0909-1.04.2509-1.52v-2.0728h-2.67269c-.54182 1.08-.85091 2.3018-.85091 3.5928 0 1.2909.30909 2.5127.85091 3.5927z"
                  fill="#fbbc05"
                />
                <path
                  d="m16.1496 11.1818c1.1745 0 2.2291.4037 3.0582 1.1964l2.2945-2.2946c-1.3854-1.29087-3.1963-2.0836-5.3527-2.0836-3.1273 0-5.8327 1.79273-7.14911 4.4073l2.67271 2.0727c.6291-1.8909 2.3928-3.2982 4.4764-3.2982z"
                  fill="#ea4335"
                />
              </g>
            </svg>
            <span className="text-lg font-medium" onClick={handleGoogleLogin}>
              Google로 시작하기
            </span>
          </button>
        </div>
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
