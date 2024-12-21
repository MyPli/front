"use client";

import { Playlist } from "@/models/playlist.model";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoPlaySharp } from "react-icons/io5";

interface IProps extends Playlist {
  size?: "large" | "small";
}

const Card = ({ size = "large", ...props }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/playlist/${props.id}`}
      className={`flex flex-col cursor-pointer relative`}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${size === "small" ? "w-full" : ""}`}>
        {isHovered && (
          <div className="w-full h-full bg-black absolute backdrop-blur-sm top-0 left-0 flex justify-center items-center opacity-70 z-30">
            <IoPlaySharp size={size === "large" ? 87 : 60} />
          </div>
        )}
        {props.coverImage ? (
          <Image
            width={640}
            height={360}
            src={props.coverImage}
            alt={props.title}
            className={`rounded-2xl object-cover object-top w-full h-full ${
              size === "large" ? "aspect-video" : "aspect-square"
            }`}
          />
        ) : (
          <div
            className={`rounded-2xl object-cover object-top w-full h-full bg-[#54545430] flex justify-center items-center text-[#545454] ${
              size === "large" ? "aspect-video" : "aspect-square"
            }`}
          >
            <Image
              src="/logo-gray.png"
              alt="logos for no cover images"
              width={100}
              height={50}
            />
          </div>
        )}
      </div>
      <h4 className={`w-full text-[16px] line-clamp-1 mt-2`}>{props.title}</h4>
    </Link>
  );
};

export default Card;
