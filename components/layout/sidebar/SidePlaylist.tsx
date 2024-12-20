import React from "react";
import SideOpenItem from "./SideOpenItem";
import { usePlaylistState } from "@/hooks/usePlaylistState";

const SidePlaylist = () => {
  const { myplaylists } = usePlaylistState();

  const playlistItems = myplaylists || [];

  return (
    <SideOpenItem
      title="내 리스트"
      items={playlistItems.length > 0 ? playlistItems : undefined}
    />
  );
};

export default SidePlaylist;
