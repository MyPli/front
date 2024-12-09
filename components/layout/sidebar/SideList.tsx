"use client";

import { useSideStore } from "@/store/sideStore";
import React from "react";
import SideLinkItem from "./SideLinkItem";
import SideBookmark from "./SideBookmark";
import SidePlaylist from "./SidePlaylist";

const SideList = () => {
  const { isOpen } = useSideStore();

  return (
    <ul
      className={`fixed top-sidelistTop left-0 flex flex-col  h-full z-10  py-4 rounded-md
      ${
        isOpen
          ? "bg-sidebar w-sideOpen overflow-y-scroll"
          : "bg-black w-sideClose  gap-6  py-2"
      }
    `}
    >
      <SideLinkItem />

      {isOpen && (
        <>
          <section className="p-4 pl-2 pb-1 border-y-[1px] border-divider">
            <SidePlaylist />
          </section>
          <section className="p-4 pl-2 pb-1">
            <SideBookmark />
          </section>
        </>
      )}
    </ul>
  );
};

export default SideList;
