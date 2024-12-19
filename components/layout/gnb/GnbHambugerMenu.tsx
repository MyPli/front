import { useSideBarStore } from "@/store/sideBarStore";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const HambugerMenu = () => {
  const { toggleSideBar } = useSideBarStore();

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
