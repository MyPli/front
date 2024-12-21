import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyPlaylists } from "@/action/playlist";
import SideOpenItem from "./SideOpenItem";

const SidePlaylist = () => {
  const { data: myplaylists } = useQuery({
    queryKey: ["myplaylists"],
    queryFn: getMyPlaylists,
    initialData: [],
  });
  console.log(myplaylists);

  return <SideOpenItem title="내 리스트" items={myplaylists} />;
};

export default SidePlaylist;
