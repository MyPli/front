import { useSideBarStore } from "@/store/sideBarStore";
import React, { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const HambugerMenu = () => {
  const { isOpen, toggleSideBar } = useSideBarStore();

  useEffect(() => {
    console.log(isOpen ? "열림 상태" : "닫힘 상태");
  }, [isOpen]);

  return (
    <button
      id="hamburger"
      type="button"
      className="w-12 h-12 p-2 flex-center  hover:bg-gray rounded-md"
      onClick={toggleSideBar}
    >
      <RxHamburgerMenu className="w-full h-full" />
    </button>
  );
};

export default HambugerMenu;
