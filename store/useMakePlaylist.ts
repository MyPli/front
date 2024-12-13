import { create } from "zustand";

export type TrackInfo = {
  imageUrl: string;
  title: string;
  artist: string;
  time: string;
  isAdded: boolean;
};

export type PlaylistInfo = {
  title: string;
  imageUrl: string;
  tags: string[];
  totalTime: string;
  count: number;
};

interface StoreState {
  playlistInfo: PlaylistInfo;
  setPlaylistInfo: (value: PlaylistInfo) => void;
  tracks: TrackInfo[];
  setTracks: (tracks: TrackInfo[]) => void;
  addTrack: (track: TrackInfo) => void;
  removeTrack: (value: Pick<TrackInfo, "title" | "artist">) => void;
  clearPlaylist: () => void;
}

export const useMakePlaylist = create<StoreState>((set) => ({
  playlistInfo: {
    title: "",
    imageUrl: "",
    tags: [],
    totalTime: "",
    count: 0,
  },
  tracks: [],
  setTracks: (tracks: TrackInfo[]) => set({ tracks }),
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
        imageUrl: "",
        tags: [],
        totalTime: "",
        count: 0,
      },
    }),
}));
