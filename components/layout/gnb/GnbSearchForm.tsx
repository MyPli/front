"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

const GnbSearchForm = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === "") return;

    router.push(`/search?q=${encodeURIComponent(search)}`);
    setSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full border-b-[1px] border-white border-solid items-center"
    >
      <input
        onChange={handleChange}
        placeholder="검색어를 입력하세요"
        className="w-full bg-transparent border-none px-2 py-2 outline-none text-sm"
      />
      <button className="w-6 h-6 flex-center">
        <HiMagnifyingGlass className="w-full h-full" />
      </button>
    </form>
  );
};

export default GnbSearchForm;
