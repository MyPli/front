'use client'

import Create from "@/components/CreatePage/CreatePage";
import { usePlaylistState } from '@/hooks/usePlaylistState';
import { useMakePlaylist } from '@/store/useMakePlaylist';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const EditPlaylist = () => {
  const params = useParams();
  const playlistId = params.id;

  const { playlistData } = usePlaylistState(Number(playlistId));
  const { setPlaylistInfo, setTracks } = useMakePlaylist();

  useEffect(() => {
    if (playlistData) {
      setPlaylistInfo({
        ...playlistData,
        count: playlistData?.videos?.length,
        coverImage: playlistData?.coverImage || "",
      });
      setTracks(playlistData?.videos);
      console.log(playlistData);
    }
  }, [playlistData]);

  return <Create isEditMode />;
};

export default EditPlaylist;
