import { Video } from '@/models/playlist.model';
import { create } from "zustand";

export type PlaylistInfo = {
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  totalTime: string;
  count: number;
};

interface StoreState {
  playlistInfo: PlaylistInfo;
  setPlaylistInfo: (value: PlaylistInfo) => void;
  tracks: Video[];
  setTracks: (tracks: Video[]) => void;
  addTrack: (track: Video) => void;
  removeTrack: (value: Pick<Video, "title" | "artist">) => void;
  clearPlaylist: () => void;
}

export const useMakePlaylist = create<StoreState>((set) => ({
  playlistInfo: {
    title: "",
    coverImage: "",
    tags: [],
    totalTime: "",
    count: 0,
    description: '',
  },
  tracks: [],
  setTracks: (tracks: Video[]) => set({ tracks }),
  addTrack: (track) =>
    set((state) => ({
      tracks: [
        ...state.tracks,
        {
          ...track,
          isAdded: true,
        },
      ],
    })),
  removeTrack: (track) =>
    set((state) => ({
      tracks: state.tracks.filter(
        (t) => !(t.title === track.title && t.artist === track.artist),
      ),
    })),
  setPlaylistInfo: (value) => set({ playlistInfo: value }),
  clearPlaylist: () =>
    set({
      tracks: [],
      playlistInfo: {
        title: "",
        description: '',
        coverImage: "",
        tags: [],
        totalTime: "",
        count: 0,
      },
    }),
}));
