export interface Video {
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
  time: string;
  artist: string;
}

export interface PlaylistDetail {
  id: number;
  title: string;
  description: string;
  coverImage: string | null;
  createdBy: string;
  totalTime: string;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  videos: Video[];
}

export interface Playlist {
  id: number;
  coverImage: string;
  createdAt: string;
  title: string;
}

export interface MyPlaylist extends Playlist {
  videos: Video[];
}
