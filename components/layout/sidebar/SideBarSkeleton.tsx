import React from "react";

const SideBarSkeleton = () => {
  return (
    <li
      className="flex flex-row 
          items-center pl-6 gap-8 
          py-2 hover:bg-gray rounded-md 
          hover:text-black"
    >
      <div className="bg-gray rounded-sm w-10 h-10" />
      <div className="bg-gray rounded-sm w-20 h-2" />
    </li>
  );
};

export default SideBarSkeleton;
