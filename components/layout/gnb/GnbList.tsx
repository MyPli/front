"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./GnbSearchForm";
import HambugerMenu from "./GnbHambugerMenu";

const GnbList = () => {
  return (
    <ul className="pr-8 pl-6 py-5 flex items-center justify-between fixed top-0 left-0 z-10 w-full">
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
        <button>
          <span>마이페이지</span>
        </button>
        <button>
          <span>로그아웃</span>
        </button>
      </li>
    </ul>
  );
};

export default GnbList;
