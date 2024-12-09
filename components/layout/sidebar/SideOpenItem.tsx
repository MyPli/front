"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface SideOpenItemProps {
  title?: string;
}

const ITEMS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SideOpenItem = ({ title }: SideOpenItemProps) => {
  const [showAll, setShowAll] = useState(false);
  const handleClickMore = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <h2 className="pl-6 text-lg mb-2 text-md">{title}</h2>
      {ITEMS?.slice(0, showAll ? ITEMS.length : 3).map((item) => (
        <li
          key={item}
          className="flex flex-row 
          items-center pl-6 gap-8 
          py-2 hover:bg-gray rounded-md 
          hover:text-black"
        >
          <div className="bg-gray rounded-sm w-10 h-10" />
          <div className="bg-gray rounded-sm w-20 h-2" />
        </li>
      ))}

      <li
        className="flex flex-row items-center
       pl-6 gap-12 pt-2 hover:bg-gray 
        rounded-md hover:text-black pb-1"
      >
        {showAll ? (
          <IoIosArrowUp className="w-8 h-8 " />
        ) : (
          <IoIosArrowDown className="w-8 h-8 " />
        )}
        <button className="text-sm cursor-pointer" onClick={handleClickMore}>
          {showAll ? "간략히 보기" : "더보기"}
        </button>
      </li>
    </>
  );
};

export default SideOpenItem;
