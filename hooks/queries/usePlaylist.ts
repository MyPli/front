"use client";

import {
  addVideoToPlaylist,
  deletePlaylist,
  getLatestPlaylists,
  getMyPlaylists,
  getPlaylistDetail,
  getPopularPlaylists,
  updatePlaylistDetail,
} from "@/action/playlist";
import { Playlist } from "@/models/playlist.model";
import { queryClient } from "@/utils/ReactQueryProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useGetPlaylistDetail = (playlistId: number) => {
  return useQuery({
    queryKey: ["get-playlist", playlistId],
    queryFn: () => getPlaylistDetail(playlistId),
  });
};

const useUpdatePlaylist = () => {
  return useMutation({
    mutationFn: ({ playlistId }: { playlistId: number }) =>
      updatePlaylistDetail(playlistId),
    onSuccess: (_, variables) =>
      queryClient.refetchQueries({
        queryKey: ["get-playlist", variables.playlistId],
      }),
  });
};

const useDeletePlaylsit = () => {
  const navigate = useRouter();

  return useMutation({
    mutationFn: ({ playlistId }: { playlistId: number }) =>
      deletePlaylist(playlistId),
    onSuccess: () => {
      navigate.push("/");
    },
  });
};

const useAddVideo = () => {
  return useMutation({
    mutationFn: ({ playlistId }: { playlistId: number }) =>
      addVideoToPlaylist(playlistId),
    onSuccess: (_, variables) => {
      queryClient.refetchQueries({
        queryKey: ["get-playlist", variables.playlistId],
      });
    },
  });
};

const useGetLatestPlaylists = () => {
  return useQuery<Playlist[]>({
    queryKey: ["latest-playlists"],
    queryFn: getLatestPlaylists,
  });
};

const useGetPopularPlaylists = () => {
  return useQuery<Playlist[]>({
    queryKey: ["popular-playlistst"],
    queryFn: getPopularPlaylists,
  });
};

const useGetMyPlaylists = () => {
  return useQuery({
    queryKey: ["myplaylists"],
    queryFn: getMyPlaylists,
    initialData: [],
  });
};

export {
  useGetPlaylistDetail,
  useUpdatePlaylist,
  useDeletePlaylsit,
  useAddVideo,
  useGetLatestPlaylists,
  useGetPopularPlaylists,
  useGetMyPlaylists,
};
