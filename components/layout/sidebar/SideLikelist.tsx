import React from "react";
import SideOpenItem from "./SideOpenItem";
import { useLikelistState } from "@/hooks/useLikelistState";

const SideLikelist = () => {
  const { likelist } = useLikelistState();

  const data = likelist || [];

  return <SideOpenItem title="내 좋아요 리스트" items={data} />;
};

export default SideLikelist;
