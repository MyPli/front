import { useSideStore } from "@/store/sideStore";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const HambugerMenu = () => {
  const { activeSideList } = useSideStore();
  return (
    <button
      className="w-12 h-12 p-2 flex-center  hover:bg-gray rounded-md"
      onClick={activeSideList}
    >
      <RxHamburgerMenu className="w-full h-full" />
    </button>
  );
};

export default HambugerMenu;
