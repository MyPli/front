import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSideBarStore } from "@/store/sideBarStore";
import {
  IoAddCircle,
  IoAddCircleOutline,
  IoFolderOpen,
  IoFolderOpenOutline,
  IoHeart,
  IoHeartOutline,
} from "react-icons/io5";

interface sideItemProps {
  outlineIcon: React.ReactNode;
  fillIcon: React.ReactNode;
  title: string;
  href: string;
}

const SIDE_ITEMS: sideItemProps[] = [
  {
    outlineIcon: <IoFolderOpenOutline className="w-full h-full" />,
    fillIcon: <IoFolderOpen className="w-full h-full" />,
    title: "내 리스트",
    href: "/myPlaylist",
  },
  {
    outlineIcon: <IoHeartOutline className="w-full h-full" />,
    fillIcon: <IoHeart className="w-full h-full" />,
    title: "좋아요",
    href: "/likes",
  },
  {
    outlineIcon: <IoAddCircleOutline className="w-full h-full" />,
    fillIcon: <IoAddCircle className="w-full h-full" />,
    title: "생성",
    href: "/create",
  },
];

const SideLinkItem = () => {
  const pathname = usePathname();
  const { isOpen } = useSideBarStore();

  return SIDE_ITEMS.map(({ href, fillIcon, outlineIcon, title }) => (
    <li className={`${isOpen ? "px-3 mb-2 " : "px-4"}`} key={href}>
      <Link
        href={href}
        className={` hover:bg-gray rounded-md hover:text-black px-4 
          ${
            isOpen
              ? "flex flex-row items-center pl-6 gap-10 py-3 "
              : "flex-col flex-center gap-2 py-2"
          }

          ${
            isOpen && pathname == href ? "bg-gray text-black" : "bg-transparent"
          }

          `}
      >
        <div className="w-7 h-7 flex-center">
          {pathname == href ? fillIcon : outlineIcon}
        </div>
        <span className={`${isOpen ? "text-md" : "text-xs"} whitespace-nowrap`}>
          {title}
        </span>
      </Link>
    </li>
  ));
};

export default SideLinkItem;
