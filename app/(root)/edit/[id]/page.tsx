"use client";

import Create from "@/components/CreatePage/CreatePage";
import { useMakePlaylist } from "@/store/useMakePlaylist";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const EditPlaylist = () => {
  const { id } = useParams(); // 플레이리스트 아이디
  const { setPlaylistInfo, setTracks } = useMakePlaylist();

  useEffect(() => {
    if (id) {
      setPlaylistInfo({
        title: "",
        imageUrl: "",
        tags: [],
        count: 0,
        totalTime: "",
      });
      setTracks([]);
    }
  }, [id]);

  return <Create isEditMode />;
};

export default EditPlaylist;
