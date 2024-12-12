"use client";

import { useSideBarStore } from "@/store/sideBarStore";
import React, { useEffect, useRef } from "react";
import SideLinkItem from "./SideLinkItem";
import SideBookmark from "./SideBookmark";
import SidePlaylist from "./SidePlaylist";

const SideList = () => {
  const { isOpen, closeSideBar } = useSideBarStore();
  const sideListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;

      const hamburger = document.getElementById("hamburger");
      const isClickOutside =
        sideListRef.current &&
        !sideListRef.current.contains(target) &&
        hamburger &&
        !hamburger.contains(target);

      if (isClickOutside) {
        closeSideBar();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [closeSideBar]);

  return (
    <ul
      ref={sideListRef}
      className={`fixed top-sidelistTop left-0 
        h-[calc(100vh-71px)] 
        z-10 py-4 rounded-md  
        overflow-y-auto 
        scrollbar-hide
        
      ${isOpen ? "bg-sidebar w-sideOpen" : "bg-black w-sideClose gap-6 py-2 "}
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
