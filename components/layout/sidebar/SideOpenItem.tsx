"use client";

import { Like } from "@/models/like.model";
import { MyPlaylist } from "@/models/playlist.model";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface SideOpenItemProps {
  title: string;
  items: Like[] | MyPlaylist[] | [];
}

const SideOpenItem = ({ title, items = [] }: SideOpenItemProps) => {
  const [showAll, setShowAll] = useState(false);

  const handleClickMore = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div>
      <h2 className="pl-6 text-lg mb-2 text-md">{title}</h2>
      <ul>
        {items?.slice(0, showAll ? items.length : 5).map((item) => (
          <li key={item.id}>
            <Link
              href={`/playlist/${item.id}`}
              className="flex flex-row 
                items-center pl-6 gap-8 
                py-2 hover:bg-gray rounded-md 
                hover:text-black"
            >
              <Image
                src={item.coverImage ? item.coverImage : "/blur.png"}
                width={40}
                height={40}
                alt={`${item.title} 커버 이미지`}
              />
              <span>
                {item.title.length < 6
                  ? item.title
                  : item.title.slice(0, 6) + "..."}
              </span>
            </Link>
          </li>
        ))}
        <li
          className="flex flex-row items-center
            pl-6 gap-12 pt-2 hover:bg-gray 
            rounded-md hover:text-black pb-1"
        >
          {showAll ? (
            <IoIosArrowUp className="w-8 h-8" />
          ) : (
            <IoIosArrowDown className="w-8 h-8" />
          )}
          <button
            className="text-sm cursor-pointer"
            onClick={handleClickMore}
            aria-expanded={showAll}
          >
            {showAll ? "간략히 보기" : "더보기"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideOpenItem;
